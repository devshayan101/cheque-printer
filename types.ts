export interface ChequeData {
  payee: string;
  amount: number | '';
  amountInWords: string; // usually auto-generated, but editable
  date: string; // YYYY-MM-DD
  isBearer: boolean;
  isAccountPayee: boolean;
}

export interface BankLayout {
  id: string;
  name: string;
  imageUrl: string; // URL of the cheque leaf background
  // Coordinates in millimeters relative to top-left of the cheque
  coords: {
    date: { x: number; y: number; spacing: number }; // spacing between digits
    payee: { x: number; y: number };
    amountWords: { x: number; y: number; lineHeight: number; width: number };
    amountNumber: { x: number; y: number };
    bearer: { x: number; y: number }; // position of the strike-through
    acPayee: { x: number; y: number };
  };
}

export interface FieldOffset {
  x: number;
  y: number;
}

export interface PrintSettings {
  offsetX: number; // mm
  offsetY: number; // mm
  showBackground: boolean;
  fontSize: number;
  fieldOffsets: {
    payee: FieldOffset;
    acPayee: FieldOffset;
    date: FieldOffset;
    bearer: FieldOffset;
    amountNumber: FieldOffset;
    amountWords: FieldOffset;
  };
}