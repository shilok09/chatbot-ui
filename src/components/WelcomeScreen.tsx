import React from "react";
import { motion } from "framer-motion";
import { Bookmark, Monitor, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WelcomeScreenProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onCategorySelect, 
  selectedCategory = "All" 
}) => {
  const features = [
    {
      icon: Bookmark,
      title: "Saved Prompt Templates",
      description: "Users save and reuse prompt templates for faster responses.",
    },
    {
      icon: Monitor,
      title: "Media Type Selection",
      description: "Users select media type for tailored interactions.",
    },
    {
      icon: Globe2,
      title: "Multilingual Support",
      description: "Choose language for better interaction.",
    },
  ];

  const categories = ["All", "Text", "Image", "Video", "Music", "Analytics"];

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-8">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary-foreground flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-foreground rounded-full" />
          </div>
        </div>
      </motion.div>

      {/* Welcome Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-light text-foreground mb-4">
          How can i help you today?
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          This code will display a prompt asking the user for their name, and
          then it will display a greeting message with the name entered by the
          user.
        </p>
      </motion.div>

      {/* Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-4xl"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            className="bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/20 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium text-card-foreground mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap gap-2 justify-center mb-8"
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect?.(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              selectedCategory === category
                ? "text-primary border-b-2 border-primary bg-transparent"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </motion.div>
    </div>
  );
};