import React from 'react';
import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";


const Widget = ({type}) => {

  // temp
  const amount = 100;
  const diff = 20;

  let data;
  switch(type) {
    case 'user': 
      data={
        title:"USERS",
        isMoney: false,
        link:"See all users",
        icon: (
          <PersonOutlinedIcon className='icon' style={{color: '#e88607'}}/>
        )
      };
      break;
    case 'order': 
      data={
        title:"ORDERS",
        isMoney: false,
        link:"View all orders",
        icon: (
          <ShoppingCartOutlinedIcon className='icon' style={{color: '#e88607'}}/>
        )
    };
      break;
    case 'earning': 
      data={
        title:"EARNINGS",
        isMoney: true,
        link:"View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon className='icon' style={{color: '#e88607'}}/>
        )
    };
      break;
    case 'balance': 
      data={
        title:"BALANCE",
        isMoney: false,
        link:"View balance",
        icon: (
          <AccountBalanceWalletOutlinedIcon className='icon' style={{color: '#e88607'}}/>
        )
    };
      break;
    default: 
      break;
  }

  return (
    <div className='widget'>
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">
              {data.isMoney && "$"}{amount}
            </span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <KeyboardArrowUpIcon  />
                {diff}
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget