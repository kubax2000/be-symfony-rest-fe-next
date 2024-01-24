import Image from "next/image";

type UserProps = {
    name?: string;
    description?: string;
    src?: string;
}

export default function User({name, description, src}: UserProps) {
    return (
        <div className="flex items-center gap-2">
            {src != null && (
                <Image
                    alt="User image"
                    className="rounded-full"
                    height={40}
                    src={src}
                    width={40}/>
            )}
            <div className="flex flex-col">
                <span className="text-small">{name}</span>
                {description != null && (
                    <span className="text-tiny text-gray-500">{description}</span>
                )}
            </div>
        </div>
    )
}