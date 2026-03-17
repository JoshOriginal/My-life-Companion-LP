const PDFDocument = require('pdfkit');
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

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
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    // Formspree webhook payload
    const data = req.body;

    console.log('Received webhook data:', JSON.stringify(data, null, 2));

    // Validate required fields
    if (!data.fullName || !data.email || !data.phone) {
      console.error('Missing required fields:', { fullName: data.fullName, email: data.email, phone: data.phone });
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, phone'
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

    console.log('Mapped formData:', JSON.stringify(formData, null, 2));

    // Generate PDF
    const pdfBuffer = await generatePDF(formData);
    console.log('PDF generated successfully, size:', pdfBuffer.length);

    // Send email
    await sendEmail(pdfBuffer, formData.email);
    console.log('Email sent successfully');

    return res.status(200).json({
      success: true,
      message: 'Application processed successfully'
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
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });
      const buffers = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => {
        resolve(Buffer.concat(buffers));
      });
      doc.on('error', reject);

      // Header
      doc.fontSize(24).font('Helvetica-Bold').text('My Life Companion', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(18).text('Funeral Cover Application Form', { align: 'center' });
      doc.moveDown(1);

      // Principal Member Details
      doc.fontSize(16).font('Helvetica-Bold').text('PRINCIPAL MEMBER DETAILS');
      doc.moveDown(0.5);
      doc.font('Helvetica').fontSize(12);
      doc.text(`Full Name: ${formData.principal_name}`);
      doc.text(`ID/Passport Number: ${formData.principal_id}`);
      doc.text(`KRA PIN: ${formData.kra_pin}`);
      doc.text(`Phone Number: ${formData.phone}`);
      doc.text(`Email Address: ${formData.email}`);
      doc.text(`Date of Birth: ${formData.dob}`);
      doc.text(`Gender: ${formData.gender}`);
      doc.moveDown(1);

      // Cover Option
      doc.fontSize(14).font('Helvetica-Bold').text('COVER OPTION SELECTED');
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(12).text(`Plan: ${formData.cover_option}`);
      doc.moveDown(1);

      // Spouse Details
      if (formData.spouse_name) {
        doc.fontSize(14).font('Helvetica-Bold').text('SPOUSE DETAILS');
        doc.moveDown(0.3);
        doc.font('Helvetica').fontSize(12);
        doc.text(`Full Name: ${formData.spouse_name}`);
        doc.text(`ID/Passport Number: ${formData.spouse_id}`);
        doc.text(`Date of Birth: ${formData.spouse_dob}`);
        doc.moveDown(1);
      }

      // Children Covered
      const children = [
        { name: formData.child1_name, cert: formData.child1_birth_certificate, dob: formData.child1_dob },
        { name: formData.child2_name, cert: formData.child2_birth_certificate, dob: formData.child2_dob },
        { name: formData.child3_name, cert: formData.child3_birth_certificate, dob: formData.child3_dob },
        { name: formData.child4_name, cert: formData.child4_birth_certificate, dob: formData.child4_dob }
      ].filter(c => c.name);

      if (children.length > 0) {
        doc.fontSize(14).font('Helvetica-Bold').text('CHILDREN COVERED');
        doc.moveDown(0.3);
        children.forEach((child, index) => {
          doc.font('Helvetica').fontSize(12);
          doc.text(`${index + 1}. Full Name: ${child.name}`);
          doc.text(`   Birth Certificate Number: ${child.cert}`);
          doc.text(`   Date of Birth: ${child.dob}`);
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Parents/Parents-in-law Covered
      const parents = [
        { name: formData.parent1_name, rel: formData.parent1_relationship, id: formData.parent1_id, dob: formData.parent1_dob },
        { name: formData.parent2_name, rel: formData.parent2_relationship, id: formData.parent2_id, dob: formData.parent2_dob },
        { name: formData.parent3_name, rel: formData.parent3_relationship, id: formData.parent3_id, dob: formData.parent3_dob },
        { name: formData.parent4_name, rel: formData.parent4_relationship, id: formData.parent4_id, dob: formData.parent4_dob }
      ].filter(p => p.name);

      if (parents.length > 0) {
        doc.fontSize(14).font('Helvetica-Bold').text('PARENTS / PARENTS-IN-LAW COVERED');
        doc.moveDown(0.3);
        parents.forEach((parent, index) => {
          doc.font('Helvetica').fontSize(12);
          doc.text(`${index + 1}. Full Name: ${parent.name}`);
          doc.text(`   Relationship: ${parent.rel}`);
          doc.text(`   ID Number: ${parent.id}`);
          doc.text(`   Date of Birth: ${parent.dob}`);
          doc.moveDown(0.5);
        });
        doc.moveDown(0.5);
      }

      // Beneficiary Details
      doc.fontSize(14).font('Helvetica-Bold').text('BENEFICIARY DETAILS');
      doc.moveDown(0.3);
      doc.font('Helvetica').fontSize(12);
      doc.text(`Full Name: ${formData.beneficiary_name}`);
      doc.text(`Relationship: ${formData.beneficiary_relationship}`);
      doc.text(`ID / Passport Number: ${formData.beneficiary_id}`);
      doc.text(`Phone Number: ${formData.beneficiary_phone}`);
      doc.moveDown(2);

      // Footer
      doc.fontSize(10).font('Helvetica-Bold').text('My Life Companion Funeral Services', { align: 'center' });
      doc.moveDown(0.5);
      doc.fontSize(9).font('Helvetica').text('Customer Signature: _______________________________', { align: 'center' });
      doc.text('Date: _________________________________', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

// Send email using Resend
async function sendEmail(pdfBuffer, applicantEmail) {
  const { data, error } = await resend.emails.send({
    from: 'My Life Companion <onboarding@resend.dev>',
    to: ['info@mylife-companion.com', 'mylifecompanion01@gmail.com'],
    reply_to: applicantEmail,
    subject: 'New My Life Companion Funeral Cover Application',
    text: 'A new application has been submitted. See attached PDF.',
    attachments: [
      {
        filename: 'application.pdf',
        content: pdfBuffer,
      },
    ],
  });

  if (error) {
    throw new Error(`Email sending failed: ${error.message}`);
  }

  return data;
}