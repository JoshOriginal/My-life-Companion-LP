const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = req.body;

    // Map form data to expected structure
    const formData = {
      principal_name: data.fullName,
      principal_id: data.idPassport,
      kra_pin: data.kraPin,
      phone: data.phone,
      email: data.email,
      dob: data.dateOfBirth,
      gender: data.gender,
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
      beneficiary_name: data.beneficiaryName,
      beneficiary_relationship: data.relationship,
      beneficiary_id: data.beneficiary_id,
      beneficiary_phone: data.beneficiaryPhone,
      cover_option: data.coverOption
    };

    // Generate PDF
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', async () => {
      const pdfBuffer = Buffer.concat(buffers);

      // Send email
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: ['info@mylife-companion.com', 'mylifecompanion01@gmail.com'],
        replyTo: formData.email,
        subject: 'New My Life Companion Funeral Cover Application',
        text: 'Please find attached the new application PDF.',
        attachments: [
          {
            filename: 'application.pdf',
            content: pdfBuffer
          }
        ]
      };

      try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Application submitted successfully. Our team will contact you shortly.' });
      } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ error: 'Failed to send email' });
      }
    });

    // PDF Content
    doc.fontSize(20).text('My Life Companion', { align: 'center' });
    doc.moveDown(0.5);
    doc.fontSize(16).text('Funeral Expense Application Form', { align: 'center' });
    doc.moveDown();

    // Principal Member
    doc.fontSize(14).font('Helvetica-Bold').text('PRINCIPAL MEMBER DETAILS');
    doc.font('Helvetica').fontSize(12);
    doc.text(`Name: ${formData.principal_name}`);
    doc.text(`ID: ${formData.principal_id}`);
    doc.text(`KRA PIN: ${formData.kra_pin}`);
    doc.text(`Phone: ${formData.phone}`);
    doc.text(`Email: ${formData.email}`);
    doc.text(`Date of Birth: ${formData.dob}`);
    doc.text(`Gender: ${formData.gender}`);
    doc.moveDown();

    // Cover Option
    doc.font('Helvetica-Bold').text('COVER OPTION');
    doc.font('Helvetica').text(`Selected Plan: ${formData.cover_option}`);
    doc.moveDown();

    // Spouse
    if (formData.spouse_name) {
      doc.font('Helvetica-Bold').text('SPOUSE DETAILS');
      doc.font('Helvetica').text(`Name: ${formData.spouse_name}`);
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
      doc.font('Helvetica-Bold').text('CHILDREN COVERED');
      doc.moveDown(0.5);
      children.forEach(child => {
        doc.font('Helvetica').text(`Name: ${child.name}, Birth Certificate: ${child.cert}, DOB: ${child.dob}`);
        doc.moveDown(0.5);
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
      doc.font('Helvetica-Bold').text('PARENTS / PARENTS-IN-LAW COVERED');
      doc.moveDown(0.5);
      parents.forEach(parent => {
        doc.font('Helvetica').text(`Name: ${parent.name}, Relationship: ${parent.rel}, ID: ${parent.id}, DOB: ${parent.dob}`);
        doc.moveDown(0.5);
      });
      doc.moveDown();
    }

    // Beneficiary
    doc.font('Helvetica-Bold').text('BENEFICIARY DETAILS');
    doc.font('Helvetica').text(`Name: ${formData.beneficiary_name}`);
    doc.text(`Relationship: ${formData.beneficiary_relationship}`);
    doc.text(`ID / Passport: ${formData.beneficiary_id}`);
    doc.text(`Phone: ${formData.beneficiary_phone}`);
    doc.moveDown();

    // Footer
    doc.font('Helvetica-Bold').text('My Life Companion Funeral Services', 50, doc.page.height - 100, { width: 400 });
    doc.text('Customer Signature: ______________________', 50, doc.page.height - 80);

    doc.end();
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}