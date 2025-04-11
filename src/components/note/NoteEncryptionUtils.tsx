
import { EncryptionMethod, encryptText, decryptText } from "@/utils/encryption";
import { useToast } from "@/components/ui/use-toast";

export const useNoteEncryption = () => {
  const { toast } = useToast();

  const handleEncrypt = (
    content: string, 
    encryptionMethod: EncryptionMethod, 
    password: string
  ): string | null => {
    if (encryptionMethod !== 'none' && encryptionMethod !== 'Atbash' && !password) {
      toast({
        title: "Password required",
        description: "Please enter a password to encrypt your note",
        variant: "destructive"
      });
      return null;
    }

    try {
      const finalContent = encryptText(content, encryptionMethod, password);
      return finalContent;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to encrypt note",
        variant: "destructive"
      });
      return null;
    }
  };

  const handleDecrypt = (
    encryptedContent: string,
    encryptionMethod: EncryptionMethod,
    password: string
  ): string | null => {
    if (encryptionMethod !== 'Atbash' && !password) {
      toast({
        title: "Password required",
        description: "Please enter the password to decrypt this note",
        variant: "destructive"
      });
      return null;
    }

    try {
      const decrypted = decryptText(encryptedContent, encryptionMethod, password);
      if (decrypted) {
        toast({
          title: "Note decrypted",
          description: "Your note has been successfully decrypted"
        });
        return decrypted;
      } else {
        toast({
          title: "Decryption failed",
          description: "Incorrect password or corrupted data",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to decrypt note",
        variant: "destructive"
      });
      return null;
    }
  };

  return { handleEncrypt, handleDecrypt };
};
