import React from 'react';

interface ProfileMenuItemProps {
  icon: string;
  label: string;
  onClick: () => void;
}

export default function ProfileMenuItem({
                                          icon,
                                          label,
                                          onClick
                                        }: ProfileMenuItemProps) {
  return (
    <li>
      <a
        onClick={onClick}
        className="cursor-pointer flex surface-border mb-3 p-3 align-items-center border-1 surface-border border-round hover:surface-hover transition-colors transition-duration-150"
      >
        <span>
          <i className={`${icon} text-xl text-primary`}></i>
        </span>
        <div className="ml-3">
          <span className="block mb-1 font-semibold">{label}</span>
        </div>
      </a>
    </li>
  );
}