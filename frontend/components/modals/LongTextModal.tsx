import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";


type LongTextModalProps = {
    content?: string;
    title: string;
    onClose: () => void;
};

export const LongTextModal = ({content, title, onClose}: LongTextModalProps) => {
    return (
        <Modal isOpen={content != null} onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <p>
                                {content}
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
