"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function ModalDelete({ open, onClose, onConfirm }) {
    return (
        <Modal show={open} size="md" onClose={onClose} popup>
            <Modal.Header />
            <Modal.Body>
                <div className="text-center px-7 py-6">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-24 w-24 text-warning-3 dark:text-warning-2" />
                    <h3 className="mb-5 text-3xl font-bold dark:text-gray-400">
                        Apakah kamu yakin?
                    </h3>
                    <div className="flex justify-center gap-4 ">
                        <Button className="bg-info-3" onClick={onConfirm}>
                            Ya, saya yakin
                        </Button>
                        <Button className="bg-error-3" onClick={onClose}>
                            Kembali
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
}
