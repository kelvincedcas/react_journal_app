
import { ArrowRightEndOnRectangleIcon, Bars3Icon } from "@heroicons/react/16/solid";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  Tooltip,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { startLogOut } from "../../store/auth";

export const NavBar = ({setIsOpen}) => {

  const {email, displayName, photoURL} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(startLogOut());
  }

  return (
    <Navbar fluid className='md:ml-60 fixed top-0 right-0 left-0 z-20 border-b-1 border-b-neutral-200 px-6'>
      <div className="md:hidden">
          <Tooltip placement="right" content='Open menu' className="hidden md:block">
            <Button 
              color='alternative' 
              className="p-3 transition-colors duration-100"
              onClick={() => setIsOpen(true)}
              ><Bars3Icon className="h-5 w-5"/>
            </Button>
          </Tooltip>
      </div>  
      <div className="flex md:order-2 ml-auto">
        <Dropdown
          className="p-2 rounded-lg"
          arrowIcon={true}
          inline
          label={
            <Tooltip content='User menu' placement="left" className="hidden md:block">
              <Avatar alt="User settings" img={photoURL} rounded bordered={!!photoURL} color="purple" className="cursor-pointer"/>
            </Tooltip>
          }
        >
          <DropdownHeader>
            <span className="block text-sm text-neutral-500">{displayName}</span>
            <span className="block truncate text-sm font-medium">{email}</span>
          </DropdownHeader>
          <DropdownDivider />
          <DropdownItem 
            icon={ArrowRightEndOnRectangleIcon} 
            className="hover:rounded-md"
            onClick={handleClickLogout}
          >
            Sign out
          </DropdownItem>
        </Dropdown>
      </div>
    </Navbar>
  );
}
