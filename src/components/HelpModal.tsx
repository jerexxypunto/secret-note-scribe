import React from 'react';

interface HelpModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
        <h2 className="text-lg font-bold mb-4">Ayuda</h2>
        <p className="text-sm text-gray-600 mb-4">
          Esta es la aplicación Secret Note Scribe. Úsala para encriptar de manera segura tus notas personales.
        </p>
        <h3 className="text-md font-semibold mb-2">Algoritmos de Encriptación</h3>
        <table className="w-full text-sm text-left border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Algoritmo</th>
              <th className="border border-gray-300 px-2 py-1">Descripción</th>
              <th className="border border-gray-300 px-2 py-1">¿Cómo funciona?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">AES</td>
              <td className="border border-gray-300 px-2 py-1">
                Advanced Encryption Standard (AES) es un algoritmo de encriptación simétrica ampliamente utilizado para la encriptación segura de datos.
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Utiliza bloques de datos y una clave secreta para realizar múltiples rondas de sustitución y permutación, asegurando que los datos sean ilegibles sin la clave.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">DES</td>
              <td className="border border-gray-300 px-2 py-1">
                Data Encryption Standard (DES) es un algoritmo de encriptación simétrica más antiguo y menos seguro que AES.
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Divide los datos en bloques de 64 bits y aplica una serie de permutaciones y sustituciones basadas en una clave de 56 bits.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">RC4</td>
              <td className="border border-gray-300 px-2 py-1">
                RC4 es un cifrado de flujo que encripta los datos byte por byte, utilizado para encriptación rápida.
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Genera un flujo de claves pseudoaleatorias que se combina con los datos originales mediante una operación XOR.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Atbash</td>
              <td className="border border-gray-300 px-2 py-1">
                Atbash es un cifrado de sustitución que invierte el alfabeto (por ejemplo, A ↔ Z, B ↔ Y). Es simple y no seguro.
              </td>
              <td className="border border-gray-300 px-2 py-1">
                Sustituye cada letra del texto por su opuesta en el alfabeto, manteniendo los caracteres no alfabéticos sin cambios.
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Ninguno</td>
              <td className="border border-gray-300 px-2 py-1">
                No se aplica encriptación. El texto permanece en formato plano.
              </td>
              <td className="border border-gray-300 px-2 py-1">
                No realiza ninguna operación sobre el texto, dejándolo tal cual.
              </td>
            </tr>
          </tbody>
        </table>
        <button
          className="mt-4 px-4 py-2 bg-light-green text-white rounded hover:bg-green-600 focus:outline-none"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default HelpModal;