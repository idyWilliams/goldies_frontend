"use client";
import { useState, useEffect, useRef, FormEvent } from "react";
import { MessageSquare, Send, X, Phone, ArrowRight, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Message {
  id: string;
  sender: "customer" | "vendor";
  text: string;
  timestamp: Date;
  status?: "sending" | "sent" | "delivered" | "read";
}

interface WhatsAppIntegrationProps {
  vendorPhone: string;
  vendorName?: string;
  vendorAvatar?: string;
  primaryColor?: string;
  position?: "right" | "left";
  showNotificationBadge?: boolean;
}

const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  vendorPhone,
  vendorName = "Vendor",
  vendorAvatar,
  primaryColor = "#25D366",
  position = "right",
  showNotificationBadge = true,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  // Format phone number for WhatsApp API
  const formatPhoneForWhatsApp = (phone: string): string => {
    return phone.replace(/\D/g, "");
  };

  const openWhatsApp = (): void => {
    const phoneNumber = formatPhoneForWhatsApp(vendorPhone);
    const url = message.trim()
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/${phoneNumber}`;

    if (message.trim()) {
      // Add message to chat history
      addMessageToHistory("customer", message);
      setMessage("");
    }

    window.open(url, "_blank");
  };

  const addMessageToHistory = (sender: "customer" | "vendor", text: string): void => {
    setChatHistory(prev => [
      ...prev,
      {
        id: generateId(),
        sender,
        text,
        timestamp: new Date(),
        status: sender === "customer" ? "sent" : undefined
      }
    ]);
  };

  const sendMessageInApp = (): void => {
    if (!message.trim()) return;

    // Add customer message
    addMessageToHistory("customer", message);
    setMessage("");

    // Simulate vendor typing
    setIsTyping(true);

    // Simulate receiving a message from vendor after typing
    setTimeout(() => {
      setIsTyping(false);
      setTimeout(() => {
        addMessageToHistory(
          "vendor",
          "Thanks for your message! I'll get back to you as soon as possible."
        );
      }, 300);
    }, 2000);
  };

  const handleSend = (e: FormEvent): void => {
    e.preventDefault();
    if (message.trim()) {
      sendMessageInApp();
    }
  };

  const toggleChat = (): void => {
    setIsOpen(prev => !prev);
  };

  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Custom message bubble animation variants
  const messageBubbleVariants = {
    hidden: (sender: string) => ({
      opacity: 0,
      x: sender === "customer" ? 20 : -20,
      scale: 0.9
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  // Chat container animation variants
  const chatContainerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transformOrigin: `bottom ${position}`
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div
      className={`fixed bottom-6 ${position === "right" ? "right-6" : "left-6"} z-50`}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-container"
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex h-[500px] max-h-[80vh] w-80 max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl backdrop-blur-sm"
            style={{
              boxShadow: `0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)`,
            }}
          >
            {/* Chat header */}
            <div
              className="flex items-center justify-between p-4"
              style={{ backgroundColor: primaryColor }}
            >
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white/30">
                  {vendorAvatar ? (
                    <Image
                      src={vendorAvatar}
                      alt={vendorName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-white/20 text-lg font-medium text-white">
                      {vendorName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{vendorName}</h3>
                  <div className="flex items-center text-xs text-white/80">
                    <span className="mr-1.5 block h-2 w-2 animate-pulse rounded-full bg-green-300"></span>
                    Online on WhatsApp
                  </div>
                </div>
              </div>
              <motion.button
                onClick={toggleChat}
                className="rounded-full p-2 text-white hover:text-white/80"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Chat messages */}
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto bg-slate-400  bg-opacity-75 p-4"
            >
              <AnimatePresence>
                {chatHistory.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex h-full items-center justify-center px-4 text-center text-gray-500"
                  >
                    <div>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                        <MessageSquare size={28} className="text-gray-400" />
                      </div>
                      <p className="font-medium">
                        Start a conversation with {vendorName}
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        Messages will sync with WhatsApp
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  chatHistory.map((msg) => (
                    <motion.div
                      key={msg.id}
                      custom={msg.sender}
                      variants={messageBubbleVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className={`mb-3 max-w-xs ${
                        msg.sender === "customer" ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <div
                        className={`rounded-lg p-3 shadow-sm ${
                          msg.sender === "customer"
                            ? "rounded-br-none bg-blue-500 text-white"
                            : "rounded-bl-none bg-white text-gray-800"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <div
                        className={`mt-1 flex items-center text-xs text-gray-500 ${
                          msg.sender === "customer"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {formatTime(msg.timestamp)}
                        {msg.sender === "customer" && (
                          <span className="ml-1">
                            {msg.status === "sending" && (
                              <Loader2 size={10} className="animate-spin" />
                            )}
                            {msg.status === "sent" && (
                              <svg
                                width="14"
                                height="10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mb-3 flex"
                  >
                    <div className="rounded-lg rounded-bl-none bg-white p-3 text-gray-500 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Chat input */}
            <motion.form
              onSubmit={handleSend}
              className="border-t border-gray-100 bg-white p-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center">
                {/* <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-opacity-50"
                  style={{ focusRingColor: primaryColor }}
                /> */}
                <motion.button
                  type="submit"
                  className="ml-2 rounded-full p-2 text-white focus:outline-none"
                  style={{ backgroundColor: primaryColor }}
                  disabled={!message.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <motion.div
                className="mt-2 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.button
                  type="button"
                  onClick={openWhatsApp}
                  className="mx-auto flex items-center justify-center rounded-full px-3 py-1 text-xs transition-colors duration-200"
                  style={{ color: primaryColor }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Continue in WhatsApp</span>
                  <ArrowRight size={12} className="ml-1" />
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        ) : (
          <motion.button
            onClick={toggleChat}
            style={{ backgroundColor: primaryColor }}
            className="relative flex items-center justify-center rounded-full p-4 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <MessageSquare size={24} className="text-white" />
            {showNotificationBadge && (
              <motion.span
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                  delay: 0.3,
                }}
              >
                1
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WhatsAppIntegration;