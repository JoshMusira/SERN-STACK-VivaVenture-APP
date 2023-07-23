
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { BsFillCaretDownFill } from 'react-icons/bs'
const Container = styled('div')({
    maxWidth: '800px',
    margin: '0 auto',
    padding: '16px',
});

const CustomAccordion = styled(Accordion)({
    marginBottom: '16px',
    boxShadow: 'none',
    '& .MuiAccordionSummary-root': {
        backgroundColor: 'gray',
        color: '#fff',
        borderRadius: '4px',
        '& .MuiAccordionSummary-content': {
            margin: '12px 0',
        },
    },
    '& .MuiAccordionDetails-root': {
        backgroundColor: 'gainsboro',
        borderTop: '2px solid #ddd',
    },
});

const QuestionComponent = () => {
    const faqs = [
        {
            question: "Can I return a product if I'm not satisfied?",
            answer:
                'Yes, you can return a product within 30 days of purchase if you are not satisfied. Please make sure the product is in its original packaging and meets our return policy criteria.',
        },
        {
            question: 'What payment methods do you accept?',
            answer:
                'We accept various payment methods, including credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. You can choose the preferred payment method during the checkout process.',
        },
        // Add more FAQs
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we offer international shipping to most countries. Please check our shipping policy for more details.',
        },
        {
            question: 'What is your warranty policy?',
            answer: 'We provide a standard 1-year warranty on all our products. Additional extended warranty options are available for select items.',
        },
        {
            question: 'Can I cancel my order?',
            answer: 'You can cancel your order within 24 hours of placing it. Please contact our customer support team to request a cancellation.',
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this tracking number to track your order on our website.',
        },
        {
            question: 'What is your return policy?',
            answer: 'Our return policy allows you to return products within 30 days of purchase. Please ensure that the product is in its original condition and packaging.',
        },
        {
            question: 'How long does shipping take?',
            answer: 'Shipping times may vary depending on your location. Generally, orders are delivered within 3-7 business days.',
        },
        {
            question: 'Do you offer bulk discounts?',
            answer: 'Yes, we offer bulk discounts for large quantity orders. Please contact our sales team for more information.',
        },
        {
            question: 'What if my product arrives damaged?',
            answer: 'If your product arrives damaged, please contact our customer support team immediately. We will assist you with a replacement or refund.',
        },
    ];

    return (
        <Container>
            <Typography variant="h4" component="h1" color="teal" fontWeight="Bolder" align="center" gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
                <CustomAccordion key={index}>
                    <AccordionSummary aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
                        <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </CustomAccordion>
            ))}
        </Container>
    );
};

export default QuestionComponent;
