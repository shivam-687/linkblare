import { GlobalToken, theme } from 'antd'
import React, { PropsWithChildren, useEffect } from 'react'
import hexToRgba from 'hex-to-rgba';

function setProperty(prop: string, hex: string) {
    document.body.style.setProperty(prop, hexToRgba(hex));
}


function tailwindColors(token: GlobalToken) {
    setProperty('--color-antd-bgBase', token.colorBgBase);
    setProperty('--color-antd-bgContainer', token.colorBgContainer);
    setProperty('--color-antd-bgContainer-disabled', token.colorBgContainerDisabled);
    setProperty('--color-antd-bgElevated', token.colorBgElevated);
    setProperty('--color-antd-bgLayout', token.colorBgLayout);
    setProperty('--color-antd-bgTextActive', token.colorBgTextActive);
    setProperty('--color-antd-bgTextHover', token.colorBgTextHover);
    setProperty('--color-antd-border', token.colorBorder);
    setProperty('--color-antd-borderBg', token.colorBorderBg);
    setProperty('--color-antd-borderSecondary', token.colorBorderSecondary);
    setProperty('--color-antd-fill', token.colorFill);
    setProperty('--color-antd-fillContent', token.colorFillContent);
    setProperty('--color-antd-fillContentHover', token.colorFillContentHover);
    setProperty('--color-antd-fillSecondary', token.colorFillSecondary);
    setProperty('--color-antd-fillAlter', token.colorFillAlter);
    setProperty('--color-antd-highlight', token.colorHighlight);
    setProperty('--color-antd-icon', token.colorIcon);
    setProperty('--color-antd-iconHover', token.colorIconHover);
    setProperty('--color-antd-linkActive', token.colorLinkActive);
    setProperty('--color-antd-link', token.colorLink);
    setProperty('--color-antd-linkHover', token.colorLinkHover);
    setProperty('--color-antd-primary', token.colorPrimary);
    setProperty('--color-antd-primaryActive', token.colorPrimaryActive);
    setProperty('--color-antd-primaryBg', token.colorPrimaryBg);
    setProperty(' --color-antd-primaryBgHover', token.colorPrimaryBgHover);
    setProperty('--color-antd-primaryBorderHover', token.colorPrimaryBgHover);
    setProperty('--color-antd-primaryHover', token.colorPrimaryHover);
    setProperty('--color-antd-primaryText', token.colorPrimaryText);
    setProperty('--color-antd-primaryTextActive', token.colorPrimaryTextActive);
    setProperty('--color-antd-primaryTextHover', token.colorPrimaryTextHover);
}



const TailwindThemeIntializer = ({
    children
}: PropsWithChildren) => {
    const { token } = theme.useToken()
    useEffect(() => {
        tailwindColors(token);
    }, [token])

    return (
        <>
            {children}
        </>
    )
}

export default TailwindThemeIntializer