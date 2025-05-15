import { MessageCircle } from "lucide-react";
import React from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string; // Boleh kosong, pakai wa.me tanpa nomor
  link: string;
}

function formatPhoneNumber(input: string): string {
  if (!input) return "";

  const cleaned = input.replace(/[^0-9]/g, "");

  if (cleaned.startsWith("0")) {
    return "62" + cleaned.slice(1);
  }

  if (cleaned.startsWith("62")) {
    return cleaned;
  }

  if (cleaned.startsWith("8")) {
    return "62" + cleaned;
  }

  return cleaned;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  link,
}) => {
  const formattedNumber = phoneNumber ? formatPhoneNumber(phoneNumber) : null;

  const message = `Hi

We're doing the thing! Ekky & Didut are finally making it official (yes, there will be love, laughter, tears of joy and awkward dancing!). 💍 We will say yes to forever on Saturday, 7 June 2025 in Jakarta.

We're inviting you to join us for a day full of happiness in celebrating our vows to the "I do", and raise a toast to forever. 

It's going to be an intimate event, to mind the limited capacity of the venue and to help us make necessary arrangements here & there, we kindly request you to RSVP the latest by 2 June 2025 by clicking on the link below:

${link}

Your presence would mean the world to us. We really hope you can make it and share our special day together.

Thank you and see you soon!

Best regards,
Ekky & Didut

*Without RSVP you cannot have access to enter the wedding venue`;

  const encodedMessage = encodeURIComponent(message);
  const waUrl = formattedNumber
    ? `https://wa.me/${formattedNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex bg-green-200 text-green-600 px-4 gap-2 rounded items-center"
    >
      <MessageCircle /> Invite
    </a>
  );
};

export default WhatsAppButton;
