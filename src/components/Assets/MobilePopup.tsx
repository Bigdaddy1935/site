'use client';
import clsx from 'clsx';
import IconWindowClose from '@/components/Icons/IconWindowClose';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import { registerRouteChangeLister } from '@/lib/routeChangeEvent/routeEvents';
import { useEffect } from 'react';

export default function MobilePopup() {
  const {
    content: { content: modalContent, origin = 'bottom', modalHeader, closeBtn  , disableCloseOnClick = false},
    open,
    setOpen,
    setContent
  } = useMobilePopup();

  const handleClose = () => {
    setContent({
      content: null
    });
    setOpen(false);
  };

  const handleOpen = () => setTimeout(() => setOpen(true), 200);
  useEffect(() => {
    modalContent ? handleOpen() : handleClose();
  }, [modalContent]);

  useEffect(() => {
    registerRouteChangeLister('completed', () => {
      handleClose();
    });
  }, []);

  return (
    <>
      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed bottom-0 left-0 right-0 top-[65px] z-30 cursor-default bg-black/5 dark:bg-black/30"
        />
      ) : null}

      {origin === 'right' ? (
        <div
          className={clsx(
            'scroll-hidden fixed right-0  top-[65px] z-30 h-[calc(100vh-65px)] w-[17rem] translate-x-[283px] overflow-y-auto bg-white opacity-0 shadow-lg shadow-black transition-all dark:bg-mdark-600',
            open && '!translate-x-0 pb-[65px] opacity-100 lg:pb-[unset]'
          )}
        >
          <p className="dark:text-white">{modalHeader}</p>
          {closeBtn ? (
            <IconWindowClose
              onClick={() => !disableCloseOnClick && handleClose()}
              className="inline-block dark:text-white"
              width={18}
              height={18}
            />
          ) : null}
          {modalContent}
        </div>
      ) : null}

      {origin === 'bottom' ? (
        <>
          <div
            onClick={() => !disableCloseOnClick && setContent({ content: null })}
            className={clsx(
              'scroll-hidden  fixed bottom-[72px] lg:bottom-0 left-0 right-0 z-30 overflow-scroll  max-h-[85vh] translate-y-[100%] rounded-t-xl bg-white p-4 opacity-0 shadow-lg shadow-black transition-all duration-200 dark:bg-mdark-600',
              open && '!translate-y-[0%] opacity-100'
            )}
          >
            {modalHeader ? (
              <div className="mb-2 flex items-center justify-between border-b border-solid pb-2">
                <p className="dark:text-white">{modalHeader}</p>
                {closeBtn ? (
                  <IconWindowClose
                    onClick={() => handleClose()}
                    className="inline-block dark:text-white cursor-pointer"
                    width={18}
                    height={18}
                  />
                ) : null}
              </div>
            ) : null}
            {modalContent}
          </div>
        </>
      ) : null}

      {origin === 'up' ? (
        <div onClick={() => !disableCloseOnClick && setContent({ content: null })} className="fixed bottom-0 z-30 left-0 right-0 top-0 flex items-center justify-center">
          <div
            onClick={() => setContent({ content: null })}
            className={clsx(
              'scroll-hidden w-[95%] max-w-lg max-h-[75vh] translate-y-[-100%] rounded-xl bg-white p-4 opacity-0 shadow-lg transition-all duration-200 dark:bg-mdark-600',
              open && '!translate-y-[0%] opacity-100'
            )}
          >
            {modalHeader ? (
              <div className="mb-2 flex items-center justify-between border-b border-solid pb-2">
                <p className="dark:text-white">{modalHeader}</p>
                {closeBtn ? (
                  <IconWindowClose
                    onClick={() => handleClose()}
                    className="inline-block dark:text-white"
                    width={18}
                    height={18}
                  />
                ) : null}
              </div>
            ) : null}
            {modalContent}
          </div>
        </div>
      ) : null}
    </>
  );
}
