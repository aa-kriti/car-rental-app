import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How do I book a car?',
    answer: 'Simply browse our car listing, select your preferred car, choose your pickup and return dates, fill in your details and confirm the booking. You will receive an instant confirmation.',
  },
  {
    question: 'What documents do I need to rent a car?',
    answer: 'You need a valid driving license, a government-issued ID proof and a credit or debit card for the security deposit. International customers need a passport and international driving permit.',
  },
  {
    question: 'Can I cancel or modify my booking?',
    answer: 'Yes, you can cancel or modify your booking up to 24 hours before the pickup time without any charges. Cancellations made within 24 hours may attract a small fee.',
  },
  {
    question: 'Is insurance included in the rental price?',
    answer: 'Yes, basic insurance is included in all our rental prices. You can also opt for premium insurance coverage at an additional cost during the booking process.',
  },
  {
    question: 'What fuel policy do you follow?',
    answer: 'We follow a full-to-full fuel policy. The car will be provided with a full tank and we expect it to be returned with a full tank. Fuel charges apply if returned with less fuel.',
  },
  {
    question: 'Are there any hidden charges?',
    answer: 'No, we believe in complete transparency. The price you see during booking is the final price. There are no hidden charges or surprise fees.',
  },
  {
    question: 'Can I return the car at a different location?',
    answer: 'Yes, we offer one-way rentals where you can pick up the car at one location and drop it off at another. Additional charges may apply depending on the distance.',
  },
  {
    question: 'What happens if the car breaks down?',
    answer: 'We provide 24/7 roadside assistance. In case of a breakdown, simply call our support number and our team will reach you within 30 minutes to assist you.',
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={styles.header}
      >
        <span style={styles.badge}>FAQs</span>
        <h2 style={styles.title}>Frequently Asked Questions</h2>
        <p style={styles.subtitle}>
          Everything you need to know about renting with us
        </p>
      </motion.div>

      {/* FAQ List */}
      <div style={styles.list}>
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            viewport={{ once: true }}
            style={{
              ...styles.item,
              border: openIndex === i
                ? '1px solid #e94560'
                : '1px solid #eee',
            }}
          >
            {/* Question */}
            <div
              style={styles.question}
              onClick={() => toggle(i)}
            >
              <span style={styles.questionText}>{faq.question}</span>
              <motion.span
                animate={{ rotate: openIndex === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  ...styles.arrow,
                  color: openIndex === i ? '#e94560' : '#888',
                }}
              >
                ▼
              </motion.span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={styles.answerWrapper}
                >
                  <p style={styles.answer}>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        style={styles.cta}
      >
        <p style={styles.ctaText}>Still have questions?</p>
        <a href="mailto:support@carrental.com" style={styles.ctaLink}>
          Contact our support team →
        </a>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    padding: '100px 48px',
    backgroundColor: '#f8f9fa',
  },
  header: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  badge: {
    display: 'inline-block',
    backgroundColor: 'rgba(233,69,96,0.1)',
    color: '#e94560',
    padding: '6px 18px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '1px',
    marginBottom: '12px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '800',
    color: '#1a1a2e',
    margin: '8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
  },
  list: {
    maxWidth: '800px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  item: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'border 0.3s ease',
  },
  question: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
  },
  questionText: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1a1a2e',
    flex: 1,
    paddingRight: '16px',
  },
  arrow: {
    fontSize: '14px',
    flexShrink: 0,
  },
  answerWrapper: {
    overflow: 'hidden',
  },
  answer: {
    padding: '0 24px 20px',
    fontSize: '15px',
    color: '#555',
    lineHeight: '1.8',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '16px',
    margin: 0,
  },
  cta: {
    textAlign: 'center',
    marginTop: '48px',
  },
  ctaText: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '8px',
  },
  ctaLink: {
    color: '#e94560',
    fontWeight: '600',
    fontSize: '16px',
    textDecoration: 'none',
  },
};

export default FAQ;