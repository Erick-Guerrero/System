import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../Navbar/Navbar.css';
import UserStatus from '../UserStatus/UserStatus';

const navigation = [
  { name: 'Home', to: '/home', current: true },
  { name: 'Vender ticket', to: '/tickets', current: false },
  { name: 'Cliente nuevo', to: '/form', current: false },
  { name: 'Mis clientes', to: '/clientes', current: false },
  { name: 'Mi perfil', to: '/perfil', current: false },
  { name: 'Caja', to: '/caja', current: false },
  { name: 'Tickets', to: '/ticketView', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className=" w-full "
      style={{ boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.5)' }}
    >
      {({ open }) => (
        <>
          <div className="">
            <div className=" inset-y-0 left-0 flex items-center sm:hidden">
              <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2   focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute align-center -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
              <div
                className="sm:hidden flex items-center justify-center w-full"
                style={{
                  width: '180px',
                  justifyContent: 'center',
                  marginLeft: '70px',
                }}
              >
                <div className="text-customBack hover-bg-green-800 text-lg font-bold font-roboto">
                  {/* Logo */}
                </div>
              </div>
            </div>
            <div className="w-full  flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <div
                className="hidden sm:flex items-center justify-start space-x-4 w-full sm:w-auto"
                style={{ width: '418px', justifyContent: 'center' }}
              >
                <div className="text-customWhite text-lg font-bold font-serif">
                  {/* Logo */}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block mt-3 justify-center">
                <div className="flex justify-center space-x-4 w-full">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={classNames(
                        item.current
                          ? 'bg-customBack text-customWhite'
                          : 'text-customWhite hover:bg-customBack hover:text-customWhite',
                        'rounded-md px-3 text-sm font-bold font-roboto'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div
                style={{
                  width: '418px',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                <UserStatus />
              </div>
              <div className="d-flex justify-content-between align-items-center w-100">
                <div className="selectNames"></div>
              </div>
            </div>
            <div className=" inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open user menu</span>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-green-100' : '',
                            'block px-4 py-2 text-sm text-green-700'
                          )}
                        >
                          Your Profile
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-green-100' : '',
                            'block px-4 py-2 text-sm text-green-700'
                          )}
                        >
                          Settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? 'bg-green-100' : '',
                            'block px-4 py-2 text-sm text-green-700'
                          )}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={classNames(
                    item.current
                      ? 'bg-customBack text-customWhite'
                      : 'text-customWhite hover:bg-customBack hover:text-customWhite',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
