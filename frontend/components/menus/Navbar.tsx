import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/components/ThemeSwitch";

import { Logo } from "@/components/icons";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">Contact.io</p>
					</NextLink>
				</NavbarBrand>
				<ul className="hidden md:flex gap-4 justify-start ml-2">
					<NavbarItem>
						<NextLink
							className={clsx(
								linkStyles({ color: "foreground" }),
								"data-[active=true]:text-primary data-[active=true]:font-medium"
							)}
							color="foreground"
							href="/add"
						>
							Přidat
						</NextLink>
					</NavbarItem>
				</ul>
			</NavbarContent>

			<NavbarContent
				className="flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<ThemeSwitch />
			</NavbarContent>
		</NextUINavbar>
	);
};
