import chair from "../Images/chair.jpg";
import screw from "../Images/screw.jpg";
import hammer from "../Images/hammer.jpg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";

export const sliderItems = [
  {
    id: 1,
    img: chair,
    title: "Get all your Office Supply Needs!",
    shop: (
      <Link to="/product" style={{ color: "white", textDecoration: "none" }}>
        SHOP NOW
      </Link>
    ),
  },
];

export const productItems = [
  {
    id: 1,
    img: chair,
    name: "Chair 1",
    description: "Testing 1",
    weight: "weight 1 pound",
    price: "5,000",
    itemgroup:"chair",
    stock:"10",
    icon: (
      <Link to="/itemPage" style={{ color: "pink" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },
  {
    id: 2,
    img: chair,
    name: "Chair 2",
    description: "Testing 2",
    weight: "weight 2 pound",
    price: "6,000",
    itemgroup:"chair",
    stock:"9",
    icon: (
      <Link to="/itemPage" style={{ color: "lightblue" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },
  {
    id: 3,
    img: screw,
    name: "Screw 3",
    description: "Testing 3",
    weight: "weight 3 pound",
    price: "3,000",
    itemgroup:"Screw",
    stock:"10",
    icon: (
      <Link to="/itemPage" style={{ color: "lightgreen" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

  {
    id: 4,
    img: hammer,
    name: "hammer 4",
    description: "Testing 4",
    weight: "weight 4 pound",
    price: "4,000",
    itemgroup:"hammer",
    stock:"10",
    icon: (
      <Link to="/itemPage">
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

    {
    id: 5,
    img: hammer,
    name: "Hammer 1",
    description: "Testing 1",
    weight: "weight 4 pound",
    price: "4,000",
    itemgroup:"hammer",
    stock:"10",
    icon: (
      <Link to="/itemPage">
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },
];

export const inventoryItems = [
  {
    id: 1,
    img: chair,
    name: "Chair 1",
    description: "Testing Chair 1",
    description2: "Testing Nskss 2",
    description3: "Testing  sfsdfsf 3",
    description4: "Testingasdf asdfasdf  4",
    weight: "weight 1 pound",
    price: "5,000",
    itemgroup:"chair",
    stock:"10",
    icon: (
      <Link to="/itemPage" style={{ color: "pink" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },
  {
    id: 2,
    img: chair,
    name: "Chair 2",
    description: "Testing 2",
    weight: "weight 2 pound",
    price: "6,000",
    itemgroup:"chair",
    stock:"9",
    icon: (
      <Link to="/itemPage" style={{ color: "lightblue" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },
  {
    id: 3,
    img: chair,
    name: "Chair 3",
    description: "Testing 3",
    weight: "weight 3 pound",
    price: "3,000",
    itemgroup:"chair",
    stock:"10",
    icon: (
      <Link to="/itemPage" style={{ color: "lightgreen" }}>
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

  {
    id: 4,
    img: chair,
    name: "Chair 4",
    description: "Testing 4",
    weight: "weight 4 pound",
    price: "4,000",
    itemgroup:"chair",
    stock:"10",
    icon: (
      <Link to="/itemPage">
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

    {
    id: 5,
    img: hammer,
    name: "Hammer 1",
    description: "Testing 1",
    weight: "weight 4 pound",
    price: "4,000",
    itemgroup:"hammer",
    stock:"10",
    icon: (
      <Link to="/itemPage">
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

  {
    id: 2823,
    img: screw,
    name: "Screw 1",
    description: "Testing 1",
    weight: "weight 4 pound",
    price: "0,000",
    itemgroup:"screw",
    stock:"10",
    icon: (
      <Link to="/itemPage">
        <VisibilityIcon />
      </Link>
    ),
    icon2: <ShoppingCartIcon />,
    icon3: <GradeIcon />,
  },

];
