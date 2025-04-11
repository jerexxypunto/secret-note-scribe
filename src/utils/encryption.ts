
import CryptoJS from 'crypto-js';

// Available encryption methods
export type EncryptionMethod = 'AES' | 'DES' | 'RC4' | 'none';

// Encrypt a string with the specified method and password
export const encryptText = (text: string, method: EncryptionMethod, password: string): string => {
  if (method === 'none' || !text) return text;
  
  try {
    switch (method) {
      case 'AES':
        return CryptoJS.AES.encrypt(text, password).toString();
      case 'DES':
        return CryptoJS.DES.encrypt(text, password).toString();
      case 'RC4':
        return CryptoJS.RC4.encrypt(text, password).toString();
      default:
        return text;
    }
  } catch (error) {
    console.error('Encryption error:', error);
    return text;
  }
};

// Decrypt a string with the specified method and password
export const decryptText = (
  encryptedText: string, 
  method: EncryptionMethod, 
  password: string
): string => {
  if (method === 'none' || !encryptedText) return encryptedText;
  
  try {
    let bytes;
    switch (method) {
      case 'AES':
        bytes = CryptoJS.AES.decrypt(encryptedText, password);
        break;
      case 'DES':
        bytes = CryptoJS.DES.decrypt(encryptedText, password);
        break;
      case 'RC4':
        bytes = CryptoJS.RC4.decrypt(encryptedText, password);
        break;
      default:
        return encryptedText;
    }
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return ''; // Return empty string on failed decryption
  }
};
