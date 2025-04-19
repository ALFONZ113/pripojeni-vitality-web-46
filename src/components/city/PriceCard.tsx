
import React from 'react';
import { MapPin, Wifi, Tv } from 'lucide-react';

type PriceCardProps = {
  cityName: string;
  internetPriceRef: React.RefObject<HTMLSpanElement>;
  tvPriceRef: React.RefObject<HTMLSpanElement>;
  comboPriceRef: React.RefObject<HTMLSpanElement>;
  editableInternetPrice: string;
  editableTvPrice: string;
  editableComboPrice: string;
};

const PriceCard = ({
  cityName,
  internetPriceRef,
  tvPriceRef,
  comboPriceRef,
  editableInternetPrice,
  editableTvPrice,
  editableComboPrice
}: PriceCardProps) => {
  return (
    <div className="md:w-2/5 relative">
      <div className="absolute -top-5 -right-5 w-20 h-20 bg-blue-100 rounded-full filter blur-xl opacity-60" aria-hidden="true"></div>
      <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-orange-100 rounded-full filter blur-xl opacity-60" aria-hidden="true"></div>
      <div className="relative z-10 bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <MapPin className="h-6 w-6 text-poda-orange mr-2" />
          <h2 className="text-xl font-semibold text-poda-blue">PODA internet {cityName}</h2>
        </div>
        <div className="space-y-4">
          <div className="border-b border-gray-100 pb-3">
            <div className="flex items-center">
              <Wifi className="h-5 w-5 text-poda-blue mr-2" />
              <p className="text-gray-700 font-medium">Internet</p>
            </div>
            <p className="text-2xl font-bold text-poda-blue mt-1">od <span ref={internetPriceRef}>{editableInternetPrice}</span> Kč/měsíc</p>
          </div>
          <div className="border-b border-gray-100 pb-3">
            <div className="flex items-center">
              <Tv className="h-5 w-5 text-poda-blue mr-2" />
              <p className="text-gray-700 font-medium">Televize</p>
            </div>
            <p className="text-2xl font-bold text-poda-blue mt-1">od <span ref={tvPriceRef}>{editableTvPrice}</span> Kč/měsíc</p>
          </div>
          <div>
            <div className="flex items-center">
              <Wifi className="h-5 w-5 text-poda-orange mr-2" />
              <Tv className="h-5 w-5 text-poda-orange mr-2" />
              <p className="text-gray-700 font-medium">Kombinace</p>
            </div>
            <p className="text-2xl font-bold text-poda-orange mt-1">od <span ref={comboPriceRef}>{editableComboPrice}</span> Kč/měsíc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
