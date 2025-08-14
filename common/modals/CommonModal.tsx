"use client";

import { ModalProps } from "@/types/common/ModalProps";
import React from "react";
import { Modal, Button } from "react-bootstrap";



export default function CommonModal({
  show,
  size,
  title,
  footer,
  onHide,
  children,
  fullscreen,
}: ModalProps) {
  return (
    <Modal
      centered
      size={size}
      show={show}
      onHide={onHide}
      fullscreen={fullscreen}
      aria-labelledby="contained-modal-title-vcenter"
      
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>

      {footer && 
      <Modal.Footer> 
        <Button variant="secondary" onClick={() => onHide()}>
              Close
        </Button>
        <Button variant="primary">
          Save
        </Button>
        </Modal.Footer>
        }
    </Modal>
  );
}
