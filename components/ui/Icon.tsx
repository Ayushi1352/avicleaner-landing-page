import type { IconType } from "react-icons";
import { BsBuildingsFill } from "react-icons/bs";
import { FaFacebookF, FaGem, FaInstagram, FaLeaf, FaLinkedinIn, FaQuoteLeft, FaRegCircle, FaStar, FaThumbsUp, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiSparkles, HiUserGroup } from "react-icons/hi";
import {
  LuArrowRight,
  LuBath,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuHouse,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhoneCall,
  LuPlus,
  LuUtensils,
  LuX,
} from "react-icons/lu";
import { MdOutlineWindow } from "react-icons/md";
import { TbVacuumCleaner } from "react-icons/tb";

// Every icon the site can use, by the name templates.json stores. A new icon is added here once.
const icons: Record<string, IconType> = {
  BsBuildingsFill,
  FaFacebookF,
  FaGem,
  FaInstagram,
  FaLeaf,
  FaLinkedinIn,
  FaQuoteLeft,
  FaStar,
  FaThumbsUp,
  FaXTwitter,
  FaYoutube,
  HiSparkles,
  HiUserGroup,
  LuArrowRight,
  LuBath,
  LuCheck,
  LuChevronLeft,
  LuChevronRight,
  LuHouse,
  LuMail,
  LuMapPin,
  LuMenu,
  LuPhoneCall,
  LuPlus,
  LuUtensils,
  LuX,
  MdOutlineWindow,
  TbVacuumCleaner,
};

type Props = {
  name: string;
  className?: string;
};

export const Icon = ({ name, className }: Props) => {
  const Glyph = icons[name];
  if (!Glyph) {
    if (process.env.NODE_ENV !== "production") console.warn(`Icon "${name}" is not in components/ui/Icon.tsx`);
    return <FaRegCircle aria-hidden="true" className={className} />;
  }
  return <Glyph aria-hidden="true" focusable="false" className={className} />;
};
