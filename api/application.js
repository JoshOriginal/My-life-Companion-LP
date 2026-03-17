const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    // Map form data to expected structure
    const formData = {
      principal_name: data.fullName || 'N/A',
      principal_id: data.idPassport || 'N/A',
      kra_pin: data.kraPin || 'N/A',
      phone: data.phone || 'N/A',
      email: data.email || 'N/A',
      dob: data.dateOfBirth || 'N/A',
      gender: data.gender || 'N/A',
      spouse_name: data.spouse?.fullName || '',
      spouse_id: data.spouse?.idPassport || '',
      spouse_dob: data.spouse?.dateOfBirth || '',
      child1_name: data.children?.[0]?.fullName || '',
      child1_birth_certificate: data.children?.[0]?.birthCertificate || '',
      child1_dob: data.children?.[0]?.dateOfBirth || '',
      child2_name: data.children?.[1]?.fullName || '',
      child2_birth_certificate: data.children?.[1]?.birthCertificate || '',
      child2_dob: data.children?.[1]?.dateOfBirth || '',
      child3_name: data.children?.[2]?.fullName || '',
      child3_birth_certificate: data.children?.[2]?.birthCertificate || '',
      child3_dob: data.children?.[2]?.dateOfBirth || '',
      child4_name: data.children?.[3]?.fullName || '',
      child4_birth_certificate: data.children?.[3]?.birthCertificate || '',
      child4_dob: data.children?.[3]?.dateOfBirth || '',
      parent1_name: data.parents?.[0]?.fullName || '',
      parent1_relationship: data.parents?.[0]?.relationship || '',
      parent1_id: data.parents?.[0]?.idNumber || '',
      parent1_dob: data.parents?.[0]?.dateOfBirth || '',
      parent2_name: data.parents?.[1]?.fullName || '',
      parent2_relationship: data.parents?.[1]?.relationship || '',
      parent2_id: data.parents?.[1]?.idNumber || '',
      parent2_dob: data.parents?.[1]?.dateOfBirth || '',
      parent3_name: data.parents?.[2]?.fullName || '',
      parent3_relationship: data.parents?.[2]?.relationship || '',
      parent3_id: data.parents?.[2]?.idNumber || '',
      parent3_dob: data.parents?.[2]?.dateOfBirth || '',
      parent4_name: data.parents?.[3]?.fullName || '',
      parent4_relationship: data.parents?.[3]?.relationship || '',
      parent4_id: data.parents?.[3]?.idNumber || '',
      parent4_dob: data.parents?.[3]?.dateOfBirth || '',
      beneficiary_name: data.beneficiaryName || 'N/A',
      beneficiary_relationship: data.relationship || 'N/A',
      beneficiary_id: data.beneficiary_id || 'N/A',
      beneficiary_phone: data.beneficiaryPhone || 'N/A',
      cover_option: data.coverOption || 'N/A'
    };

    // Generate PDF as a promise
    const pdfBuffer = await generatePDF(formData);

    // Send email if credentials are available
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await sendEmail(pdfBuffer, formData.email);
    } else {
      console.warn('Email credentials not configured - skipping email');
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully. Our team will contact you shortly.' 
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false,
      error: error.message || 'Internal server error' 
    });
  }
};

// Generate PDF as a promise
function generatePDF(formData) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on('error', reject);

      // PDF Content
      doc.fontSize(20).text('My Life Companion', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(16).text('Funeral Expense Application Form', { align: 'center' });
      doc.moveDown(1);

      // Principal Member
      doc.fontSize(14).font('Helvetica-Bold').text('PRINCIPAL MEMBER DETAILS');
      doc.font('Helvetica').fontSize(11);
      doc.text(`Name: ${formData.principal_name}`);
      doc.text(`ID: ${formData.principal_id}`);
      doc.text(`KRA PIN: ${formData.kra_pin}`);
      doc.text(`Phone: ${formData.phone}`);
      doc.text(`Email: ${formData.email}`);
      doc.text(`Date of Birth: ${formData.dob}`);
      doc.text(`Gender: ${formData.gender}`);
      doc.moveDown();

      // Cover Option
      doc.fontSize(12).font('Helvetica-Bold').text('COVER OPTION');
      doc.font('Helvetica').fontSize(11).text(`Selected Plan: ${formData.cover_option}`);
      doc.moveDown();

      // Spouse
      if (formData.spouse_name) {
        doc.fontSize(12).font('Helvetica-Bold').text('SPOUSE DETAILS');
        doc.font('Helvetica').fontSize(11).text(`Name: ${formData.spouse_name}`);
        doc.text(`ID: ${formData.spouse_id}`);
        doc.text(`Date of Birth: ${formData.spouse_dob}`);
        doc.moveDown();
      }

      // Children
      const children = [
        { name: formData.child1_name, cert: formData.child1_birth_certificate, dob: formData.child1_dob },
        { name: formData.child2_name, cert: formData.child2_birth_certificate, dob: formData.child2_dob },
        { name: formData.child3_name, cert: formData.child3_birth_certificate, dob: formData.child3_dob },
        { name: formData.child4_name, cert: formData.child4_birth_certificate, dob: formData.child4_dob }
      ].filter(c => c.name);

      if (children.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('CHILDREN COVERED');
        doc.moveDown(0.3);
        children.forEach((child, index) => {
          doc.font('Helvetica').fontSize(11).text(`${index + 1}. Name: ${child.name}`);
          doc.text(`   Birth Certificate: ${child.cert}`);
          doc.text(`   DOB: ${child.dob}`);
          doc.moveDown(0.2);
        });
        doc.moveDown();
      }

      // Parents
      const parents = [
        { name: formData.parent1_name, rel: formData.parent1_relationship, id: formData.parent1_id, dob: formData.parent1_dob },
        { name: formData.parent2_name, rel: formData.parent2_relationship, id: formData.parent2_id, dob: formData.parent2_dob },
        { name: formData.parent3_name, rel: formData.parent3_relationship, id: formData.parent3_id, dob: formData.parent3_dob },
        { name: formData.parent4_name, rel: formData.parent4_relationship, id: formData.parent4_id, dob: formData.parent4_dob }
      ].filter(p => p.name);

      if (parents.length > 0) {
        doc.fontSize(12).font('Helvetica-Bold').text('PARENTS / PARENTS-IN-LAW COVERED');
        doc.moveDown(0.3);
        parents.forEach((parent, index) => {
          doc.font('Helvetica').fontSize(11).text(`${index + 1}. Name: ${parent.name}`);
          doc.text(`   Relationship: ${parent.rel}`);
          doc.text(`   ID: ${parent.id}`);
          doc.text(`   DOB: ${parent.dob}`);
          doc.moveDown(0.2);
        });
        doc.moveDown();
      }

      // Beneficiary
      doc.fontSize(12).font('Helvetica-Bold').text('BENEFICIARY DETAILS');
      doc.font('Helvetica').fontSize(11).text(`Name: ${formData.beneficiary_name}`);
      doc.text(`Relationship: ${formData.beneficiary_relationship}`);
      doc.text(`ID / Passport: ${formData.beneficiary_id}`);
      doc.text(`Phone: ${formData.beneficiary_phone}`);
      doc.moveDown(1);

      // Footer
      doc.fontSize(10).font('Helvetica-Bold').text('My Life Companion Funeral Services', { align: 'center' });
      doc.fontSize(9).font('Helvetica').text('Customer Signature: ______________________', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// Send email
async function sendEmail(pdfBuffer, applicantEmail) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'info@mylife-companion.com',
    replyTo: applicantEmail,
    subject: 'New My Life Companion Funeral Cover Application',
    text: `New application received from ${applicantEmail}.\n\nPlease find attached the application PDF.`,
    attachments: [
      {
        filename: 'application.pdf',
        content: pdfBuffer
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}