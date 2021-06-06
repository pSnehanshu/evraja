import clsx from 'clsx';
import { useState } from 'react';
import Link from 'next/link';
import HamburgerMenu from 'react-hamburger-menu';
import NoSSR from './NoSSR';

const NAV_HEIGHT_CLASS = 'h-16 py-3 text-white';
const NAV_BG_COLOR = '#579a60';

const navMenuItems = [
  // {
  //   label: 'Home',
  //   href: '/',
  // },
  // {
  //   label: 'Tours',
  //   href: '/tours',
  // },
  // {
  //   label: 'Initiatives',
  //   href: '/initiatives',
  // },
  // {
  //   label: 'Blogs',
  //   href: '/blogs',
  // },
  // {
  //   label: 'About Us',
  //   href: '/about',
  // },
  // {
  //   label: 'Contact Us',
  //   href: '/contact',
  // },
];

function NavItemMobile({ item, onClick }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const [isExpanded, setIsExpanded] = useState(false);

  const onItemExpandClick = () => {
    if (!hasChildren) {
      return;
    }

    setIsExpanded((v) => !v);
  };

  return (
    <li className="py-3">
      <div
        className="flex justify-between cursor-pointer"
        onClick={onItemExpandClick}
      >
        {item.href ? (
          <Link href={item.href} passHref>
            <a onClick={onClick}>{item.label}</a>
          </Link>
        ) : (
          <span>{item.label}</span>
        )}

        {hasChildren && (
          <span className="font-bold text-2xl">{isExpanded ? '-' : '+'}</span>
        )}
      </div>

      {hasChildren && isExpanded && (
        <ul className="ml-10">
          {item.children.map((item2, j) => (
            <NavItemMobile item={item2} onClick={onClick} key={j} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function NavBar() {
  const [mobileExpanded, setMobileExapnded] = useState(false);
  const [visible, setVisible] = useState(true);

  const onNavItemClick = () => {
    setVisible(false);
    setMobileExapnded(false);
    setTimeout(() => setVisible(true), 0);
  };

  if (!visible) {
    return (
      <nav
        className={NAV_HEIGHT_CLASS}
        style={{ backgroundColor: NAV_BG_COLOR }}
      />
    );
  }

  return (
    <nav
      className={clsx('relative md:flex z-10', NAV_HEIGHT_CLASS)}
      style={{ backgroundColor: NAV_BG_COLOR }}
    >
      <div className="flex justify-between">
        <Link href="/" passHref>
          <a className="p-2 font-bold">EV Raja</a>
        </Link>
        <NoSSR>
          {' '}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileExapnded((s) => !s)}
          >
            <HamburgerMenu
              isOpen={mobileExpanded}
              menuClicked={() => {}}
              width={18}
              height={15}
              strokeWidth={1}
              rotate={0}
              color="white"
              borderRadius={0}
              animationDuration={0.5}
            />
          </button>
        </NoSSR>
      </div>

      {/* Desktop menu */}
      <ul
        className="hidden md:flex mx-auto lg:-left-24 relative"
        style={{ backgroundColor: NAV_BG_COLOR }}
      >
        {navMenuItems.map((item, i) => (
          <li className="p-2 text-center group relative" key={i}>
            {item.href ? (
              <Link href={item.href} passHref>
                <a
                  className="hover:underline h-full"
                  style={{
                    textDecorationThickness: '0.5rem',
                  }}
                  onClick={onNavItemClick}
                >
                  {item.label}
                </a>
              </Link>
            ) : (
              <span className="cursor-default">{item.label}</span>
            )}
            {Array.isArray(item.children) && (
              <ul
                className="hidden group-hover:block absolute shadow-2xl min-w-max p-5 text-left"
                style={{ backgroundColor: NAV_BG_COLOR }}
              >
                {item.children.map((item2, j) => (
                  <li className="py-3" key={j}>
                    {item2.href ? (
                      <Link href={item2.href} passHref>
                        <a
                          className="hover:underline h-full"
                          style={{
                            textDecorationThickness: '0.5rem',
                          }}
                          onClick={onNavItemClick}
                        >
                          {item2.label}
                        </a>
                      </Link>
                    ) : (
                      <span className="cursor-default">{item2.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile menu */}
      {mobileExpanded && (
        <ul
          className="p-4 shadow-lg md:hidden"
          style={{ backgroundColor: NAV_BG_COLOR }}
        >
          {navMenuItems.map((item, i) => (
            <NavItemMobile item={item} onClick={onNavItemClick} key={i} />
          ))}
        </ul>
      )}
    </nav>
  );
}
