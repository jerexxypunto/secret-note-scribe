import CryptoJS from 'crypto-js';

// Available encryption methods
export type EncryptionMethod = 'AES' | 'DES' | 'RC4' | 'Atbash' | 'none';

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
      case 'Atbash':
        return atbashCipher(text);
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
    if (method === 'Atbash') {
      return atbashCipher(encryptedText); // Atbash is its own inverse
    }
    
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

// Atbash cipher implementation
const atbashCipher = (text: string): string => {
  return text.split('').map(char => {
    // Handle uppercase ASCII letters (A-Z: 65-90)
    if (char >= 'A' && char <= 'Z') {
      return String.fromCharCode(155 - char.charCodeAt(0)); // 155 = 65 + 90
    }
    // Handle lowercase ASCII letters (a-z: 97-122)
    else if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(219 - char.charCodeAt(0)); // 219 = 97 + 122
    }
    // Leave non-alphabetic characters unchanged
    return char;
  }).join('');
};
