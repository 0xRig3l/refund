import accommodationSvg from "../assets/accommodation.svg";
import foodSvg from "../assets/food.svg";
import othersSvg from "../assets/others.svg";
import servicesSvg from "../assets/services.svg";
import transportSvg from "../assets/transport.svg";

export const CATEGORIES = {
  accommodation: {
    name: "Hospedagem",
    icon: accommodationSvg,
  },
  food: {
    name: "Alimentação",
    icon: foodSvg,
  },
  others: {
    name: "Outros",
    icon: othersSvg,
  },
  services: {
    name: "Serviços",
    icon: servicesSvg,
  },
  transport: {
    name: "Transporte",
    icon: transportSvg,
  },
};

export const CATEGORIES_KEYS = Object.keys(
  CATEGORIES,
) as (keyof typeof CATEGORIES)[];
