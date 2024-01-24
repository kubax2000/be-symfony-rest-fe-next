import Contacts from "@/app/Contacts";
import {getContacts} from "@/api/contact/getContacts";
import {useUrlStore} from "@/components/common/UrlStoreHook";
import {usePagination} from "@/components/common/PaginationHook";
import {usePaginationSSR} from "@/components/common/PaginationSSRHook";

type ContactsPageProps = {
	searchParams: URLSearchParams;
};

export default async function ContactsPage({ searchParams }: ContactsPageProps) {
	const searchParamsObject = new URLSearchParams(searchParams);
	const {limit, page} = usePaginationSSR(searchParamsObject);

	const contacts = await getContacts({limit: limit, page: page});

	return <Contacts contacts={contacts} />
}
