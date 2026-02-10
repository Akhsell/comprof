import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img
            src="/image/VerveLab6.png"
            alt="VerveLab"
            className="h-10 w-auto object-contain"
        />
    );
}