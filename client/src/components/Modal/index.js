import React from "react";
import { classNames } from "../../helpers/Common";

function Modal(props) {
    const { open, children, onClose, dimmer } = props;
    const clonedChildren = onClose
        ? React.cloneElement(children, {
              onClick: (e) => {
                  if (children.props.onClick) {
                      children.props.onClick();
                  }
                  e.stopPropagation();
              },
          })
        : children;
    return (
        <>
            {open && (
                <div
                    className={classNames(
                        dimmer && "bg-black/50",
                        "fixed w-full h-screen top-0 left-0 flex items-center justify-center overflow-auto"
                    )}
                    onClick={onClose}
                >
                    {clonedChildren}
                </div>
            )}
        </>
    );
}

export default Modal;
