"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone"; 
import {
    Card,
    CardBody,
    CardFooter,
    Image,
    Tooltip,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcons";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EywIcon";

const DashboardList = [
    { title: "File", img: "/Images/File.png", order: "5" },
    { title: "Limit", img: "/Images/Limit.png", order: "5" },
    { title: "Storage", img: "/Images/Storage.png", order: "5" },
];

const columns = [
    { name: "No.", uid: "id" },
    { name: "Filename", uid: "name" },
    { name: "Link", uid: "link" },
    { name: "Uploaded At", uid: "uploadedAt" },
    { name: "Actions", uid: "actions" },
];

const files = [
    { id: 1, name: "example.pdf", link: "https://example.com/example.pdf", uploadedAt: "2023-05-15" },
    { id: 2, name: "image.jpg", link: "https://example.com/image.jpg", uploadedAt: "2023-05-12" },
    { id: 3, name: "document.docx", link: "https://example.com/document.docx", uploadedAt: "2023-05-10" },
];

export default function DashboardPage() {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                console.log("Files uploaded successfully");
            } else {
                console.error("Error uploading files");
            }
        } catch (error) {
            console.error("Error uploading files", error);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const renderCell = useCallback((file: any, columnKey: any) => {
        const cellValue = file[columnKey];

        switch (columnKey) {
            case "name":
                return <p>{cellValue}</p>;
            case "link":
                return (
                    <a href={file.link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {file.link}
                    </a>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit file">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete file">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="p-8">
            {/* Grid Section for Dashboard */}
            <div className="gap-2 grid grid-cols-3 sm:grid-cols-3 mb-8">
                {DashboardList.map((item, index) => (
                    <Card shadow="md" key={index} isPressable onPress={() => console.log(`${item.title} pressed`)}>
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="md"
                                width="100%"
                                height="100%"
                                alt={item.title}
                                className="w-full object-cover h-[140px]"
                                src={item.img}
                            />
                        </CardBody>
                        <CardFooter className="text-small justify-between">
                            <b>{item.title}</b>
                            <p className="text-default-500">{item.order}</p>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Drag and Drop Section */}
            <div {...getRootProps()} className={`border-dashed border-2 p-4 mb-8 ${isDragActive ? "border-blue-500" : "border-gray-300"}`}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-center">Drop the files here ...</p>
                ) : (
                    <p className="text-center">Drag and drop some files here, or click to select files</p>
                )}
            </div>

            {/* Table Section for Files */}
            <Table aria-label="Example table with custom cells">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.uid}>{column.name}</TableColumn>}
                </TableHeader>
                <TableBody items={files}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
