import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqData = [
  {
    id: 1,
    question: "🤔 What is this website about?",
    answer:
      "This website provides daily algorithm insights and explanations with code samples to help users learn and improve their algorithmic skills.",
  },
  {
    id: 2,
    question: "📧 How can I subscribe to daily algorithm emails?",
    answer:
      "You can subscribe by registering on our platform and enabling the daily email subscription in your account settings.",
  },
  {
    id: 3,
    question: "💰 Are there any fees for using this service?",
    answer: "No, this service is completely free to use.",
  },
  {
    id: 4,
    question: "📝 Can I suggest specific algorithms for daily insights?",
    answer:
      "Yes, you can suggest specific algorithms, and we will consider them for future daily insights.",
  },
  {
    id: 5,
    question: "📞 How can I contact support for assistance?",
    answer:
      'You can contact our support team through the "Contact Us" page on our website.',
  },
  {
    id: 6,
    question: "💬 Is there a community forum for discussions?",
    answer:
      "Yes, we have a community forum where you can engage with other users and discuss algorithms and related topics.",
  },
];

const Faq = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(10),
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h1"
          sx={{
            textAlign: "center",
            mb: theme.spacing(35),
            mt: theme.spacing(3),
          }}
        >
          Frequently Asked Questions
        </Typography>
        {faqData.map((item) => (
          <Box
            key={item.id}
            sx={{
              marginBottom: theme.spacing(8),
              borderRadius: theme.spacing(5),
              border: `2px solid ${theme.palette.primary.main}`,
              overflow: "hidden",
              boxShadow: `0px 4px 12px ${theme.palette.primary.main}`,
            }}
          >
            <Accordion
              sx={{
                borderRadius: 0,
                backgroundColor: theme.palette.background.default,
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon
                    sx={{
                      color: theme.palette.common.white,
                    }}
                  />
                }
                aria-controls={`panel-${item.id}-content`}
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  padding: "5px 20px",
                }}
              >
                <Typography variant="h3">{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  padding: theme.spacing(2),
                  padding: "15px 20px",
                }}
              >
                <Typography variant="body1">{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default Faq;
