import { BankLayout } from '../types';
import { CANARA_CHEQUE_IMAGE, ICICI_CHEQUE_IMAGE, BOB_CHEQUE_IMAGE, HDFC_CHEQUE_IMAGE } from './images';

// Measurements are approximate based on CTS-2010 standards.
// Users can fine-tune using offsets.
// Coordinates are in mm.

const DEFAULT_CHEQUE_IMAGE = "https://t3.ftcdn.net/jpg/04/37/24/85/360_F_437248530_3Zc3X0E0k0k0k0k0k0k0k0k0k0k0k0.jpg";

export const BANK_LAYOUTS: BankLayout[] = [
  {
    id: 'canara',
    name: 'Canara Bank',
    imageUrl: CANARA_CHEQUE_IMAGE,
    coords: {
      date: { x: 153, y: 6.5, spacing: 5.0 }, // Standard CTS date box position
      payee: { x: 17, y: 20 }, // Payee line start
      amountWords: { x: 33, y: 27, lineHeight: 8.5, width: 140 }, // Rupees line
      amountNumber: { x: 158, y: 34 }, // Box on right
      bearer: { x: 182, y: 22 }, // "Or Bearer" location
      acPayee: { x: 67, y: 4 }
    }
  },
  {
    id: 'sbi',
    name: 'State Bank of India (SBI)',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 163, y: 14, spacing: 6.1 },
      payee: { x: 22, y: 24 },
      amountWords: { x: 28, y: 35, lineHeight: 9, width: 135 },
      amountNumber: { x: 160, y: 44 },
      bearer: { x: 162, y: 28 },
      acPayee: { x: 50, y: 10 }
    }
  },
  {
    id: 'hdfc',
    name: 'HDFC Bank',
    imageUrl: HDFC_CHEQUE_IMAGE,
    coords: {
      date: { x: 148, y: 8, spacing: 5.0 },
      payee: { x: 15, y: 20 },
      amountWords: { x: 28, y: 28, lineHeight: 9, width: 145 },
      amountNumber: { x: 151, y: 36 },
      bearer: { x: 176, y: 23 },
      acPayee: { x: 31, y: 5 }
    }
  },
  {
    id: 'icici',
    name: 'ICICI Bank',
    imageUrl: ICICI_CHEQUE_IMAGE,
    coords: {
      date: { x: 154, y: 8, spacing: 5.0 },
      payee: { x: 16, y: 19 },
      amountWords: { x: 27, y: 28, lineHeight: 8, width: 140 },
      amountNumber: { x: 156, y: 35 },
      bearer: { x: 182, y: 22 },
      acPayee: { x: -2, y: 4 }
    }
  },
  {
    id: 'axis',
    name: 'Axis Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 160, y: 14, spacing: 6.2 },
      payee: { x: 18, y: 24 },
      amountWords: { x: 22, y: 34, lineHeight: 8.5, width: 140 },
      amountNumber: { x: 158, y: 43 },
      bearer: { x: 160, y: 28 },
      acPayee: { x: 50, y: 9 }
    }
  },
  {
    id: 'pnb',
    name: 'Punjab National Bank (PNB)',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 162, y: 15, spacing: 6.2 },
      payee: { x: 20, y: 26 },
      amountWords: { x: 25, y: 36, lineHeight: 8, width: 138 },
      amountNumber: { x: 156, y: 45 },
      bearer: { x: 160, y: 30 },
      acPayee: { x: 50, y: 10 }
    }
  },
  {
    id: 'bob',
    name: 'Bank of Baroda',
    imageUrl: BOB_CHEQUE_IMAGE,
    coords: {
      date: { x: 154, y: 7, spacing: 5.0 },
      payee: { x: 15, y: 19 },
      amountWords: { x: 25, y: 27, lineHeight: 8, width: 140 },
      amountNumber: { x: 157, y: 36 },
      bearer: { x: 183, y: 21 },
      acPayee: { x: 0, y: 4 }
    }
  },
  {
    id: 'kotak',
    name: 'Kotak Mahindra Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 158, y: 15, spacing: 6.3 },
      payee: { x: 19, y: 25 },
      amountWords: { x: 23, y: 35, lineHeight: 8, width: 142 },
      amountNumber: { x: 155, y: 44 },
      bearer: { x: 158, y: 28 },
      acPayee: { x: 50, y: 9 }
    }
  },
  {
    id: 'union',
    name: 'Union Bank of India',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 160, y: 16, spacing: 6.2 },
      payee: { x: 20, y: 28 },
      amountWords: { x: 25, y: 38, lineHeight: 8, width: 138 },
      amountNumber: { x: 156, y: 47 },
      bearer: { x: 160, y: 32 },
      acPayee: { x: 50, y: 11 }
    }
  },
  {
    id: 'idfc',
    name: 'IDFC First Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 160, y: 14, spacing: 6.2 },
      payee: { x: 20, y: 24 },
      amountWords: { x: 24, y: 34, lineHeight: 8.5, width: 140 },
      amountNumber: { x: 158, y: 43 },
      bearer: { x: 160, y: 28 },
      acPayee: { x: 50, y: 10 }
    }
  },
  {
    id: 'indusind',
    name: 'IndusInd Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 159, y: 15, spacing: 6.3 },
      payee: { x: 20, y: 26 },
      amountWords: { x: 24, y: 36, lineHeight: 8, width: 140 },
      amountNumber: { x: 157, y: 45 },
      bearer: { x: 159, y: 30 },
      acPayee: { x: 50, y: 10 }
    }
  },
  {
    id: 'yes',
    name: 'Yes Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 160, y: 14, spacing: 6.2 },
      payee: { x: 20, y: 25 },
      amountWords: { x: 25, y: 35, lineHeight: 8, width: 138 },
      amountNumber: { x: 158, y: 44 },
      bearer: { x: 160, y: 29 },
      acPayee: { x: 50, y: 10 }
    }
  },
  {
    id: 'indian',
    name: 'Indian Bank',
    imageUrl: DEFAULT_CHEQUE_IMAGE,
    coords: {
      date: { x: 162, y: 16, spacing: 6.2 },
      payee: { x: 21, y: 27 },
      amountWords: { x: 26, y: 37, lineHeight: 8, width: 135 },
      amountNumber: { x: 158, y: 46 },
      bearer: { x: 162, y: 31 },
      acPayee: { x: 50, y: 11 }
    }
  }
];