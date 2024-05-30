import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import * as GoogleGenerativeAI from "@google/generative-ai";


const API_KEY = "Your API Key"; // Kendi API keyinizi buraya ekliyebilirsiniz

const MessageItem = ({ message }) => (
  <View style={[styles.messageContainer, message.user ? styles.userMessage : styles.botMessage]}>
    <Text style={styles.messageText}>{message.text}</Text>
  </View>
);

export default function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = { text: userInput, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(userInput);
      const response = result.response.text();
      const botMessage = { text: response, user: false };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const genAI = new GoogleGenerativeAI.GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello!");
        const response = result.response.text();
        setMessages([{ text: response, user: false }]);
      } catch (error) {
        console.error("Error fetching initial message:", error);
      }
    };

    fetchInitialMessage();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />
      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={userInput}
          onChangeText={setUserInput}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  messagesContainer: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "80%",
  },
  userMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "#e1e1e1",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007AFF",
    borderRadius: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loadingIndicator: {
    marginVertical: 10,
  },
});
