import {
    Card,
    BlockStack,
    Text,
    Button,
    InlineStack,
    Badge,
    Modal,
    TextContainer,
    DropZone,
    IndexTable,
} from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

const ImageMonitoring = () => {
    const [files, setFiles] = useState([]);
    const [matchesModal, setMatchesModal] = useState(false);
    const [evidenceModal, setEvidenceModal] = useState(false);
    const [uploadModal, setUploadModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // Mock monitored images data
    const monitoredImages = [
        { id: '1', url: 'product-1.jpg', status: 'Safe', thumbnail: '/placeholder.svg' },
        { id: '2', url: 'product-2.jpg', status: 'Match Found', thumbnail: '/placeholder.svg' },
        { id: '3', url: 'product-3.jpg', status: 'Safe', thumbnail: '/placeholder.svg' },
        { id: '4', url: 'product-4.jpg', status: 'Safe', thumbnail: '/placeholder.svg' },
        { id: '5', url: 'product-5.jpg', status: 'Safe', thumbnail: '/placeholder.svg' },
        { id: '6', url: 'product-6.jpg', status: 'Match Found', thumbnail: '/placeholder.svg' },
        { id: '7', url: 'hero-banner.jpg', status: 'Safe', thumbnail: '/placeholder.svg' }
    ];

    const handleDropZoneDrop = useCallback(
        (_dropFiles, acceptedFiles, _rejectedFiles) =>
            setFiles((files) => [...files, ...acceptedFiles]),
        [],
    );

    const handleUpload = () => {
        if (files.length === 0) {
            return;
        }
        setFiles([]);
        setUploadModal(false);
    };

    const handleOpenUploadModal = () => {
        setUploadModal(true);
    };

    const handleViewEvidence = (image) => {
        setSelectedImage(image);
        if (image.status === 'Match Found') {
            setMatchesModal(true);
        } else {
            setEvidenceModal(true);
        }
    };

    const handleGeneratePackage = () => {
        setMatchesModal(false);
    };

    const handleUpgradePlan = () => {
    };

    const fileUpload = !files.length && <DropZone.FileUpload />;

    return (
        <BlockStack gap="400">
            {/* Summary Header */}
            <Card>
                <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                        <BlockStack gap="200">
                            <Text as="h2" variant="headingMd">
                                🖼️ Image Monitoring
                            </Text>
                            <Text as="p" variant="bodyMd" tone="subdued">
                                Protect your product images from unauthorized use.
                            </Text>
                        </BlockStack>
                        <Button onClick={handleUpgradePlan}>Upgrade Plan</Button>
                    </InlineStack>

                    <InlineStack align="space-between" blockAlign="center">
                        <Badge tone="info">10 of 10 monitored (Base Plan)</Badge>
                        <Text as="p" variant="bodySm" tone="subdued">
                            2 matches detected
                        </Text>
                    </InlineStack>
                </BlockStack>
            </Card>

            {/* Protected Images Table */}
            <Card>
                <BlockStack gap="400">
                    <InlineStack align="space-between" blockAlign="center">
                        <Text as="h3" variant="headingMd">
                            Protected Images
                        </Text>
                        <Button variant="primary" onClick={handleOpenUploadModal}>
                            Upload Image
                        </Button>
                    </InlineStack>

                    <Text as="p" variant="bodySm" tone="subdued">
                        +$0.02 per additional image per cycle
                    </Text>

                    <IndexTable
                        itemCount={monitoredImages.length}
                        headings={[
                            { title: 'Image' },
                            { title: 'Filename' },
                            { title: 'Status' },
                            { title: 'Actions' },
                        ]}
                        selectable={false}
                    >
                        {monitoredImages.map((image, index) => (
                            <IndexTable.Row id={image.id} key={image.id} position={index}>
                                <IndexTable.Cell>
                                    <div
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            backgroundColor: 'var(--p-color-bg-surface-secondary)',
                                            borderRadius: '4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <img
                                            src={image.thumbnail}
                                            alt={image.url}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                            }}
                                        />
                                    </div>
                                </IndexTable.Cell>
                                <IndexTable.Cell>{image.url}</IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Badge tone={image.status === 'Safe' ? 'success' : 'critical'}>
                                        {image.status}
                                    </Badge>
                                </IndexTable.Cell>
                                <IndexTable.Cell>
                                    <Button size="slim" onClick={() => handleViewEvidence(image)}>
                                        {image.status === 'Match Found' ? 'View Matches' : 'View Evidence'}
                                    </Button>
                                </IndexTable.Cell>
                            </IndexTable.Row>
                        ))}
                    </IndexTable>
                </BlockStack>
            </Card>

            {/* Upload Image Modal */}
            <Modal
                open={uploadModal}
                onClose={() => setUploadModal(false)}
                title="Upload New Image"
                primaryAction={{
                    content: 'Upload',
                    onAction: handleUpload,
                    disabled: files.length === 0,
                }}
                secondaryActions={[
                    {
                        content: 'Cancel',
                        onAction: () => {
                            setUploadModal(false);
                            setFiles([]);
                        },
                    },
                ]}
            >
                <Modal.Section>
                    <BlockStack gap="400">
                        <Text as="p" variant="bodyMd" tone="subdued">
                            Upload product images to monitor for unauthorized use across the web.
                        </Text>

                        <Text as="p" variant="bodySm" tone="subdued">
                            Additional cost: +$0.02 per image per scan cycle
                        </Text>

                        <DropZone onDrop={handleDropZoneDrop} accept="image/*">
                            {fileUpload}
                        </DropZone>

                        {files.length > 0 && (
                            <Card>
                                <BlockStack gap="200">
                                    <Text as="p" variant="bodyMd">
                                        <strong>Selected files:</strong>
                                    </Text>
                                    {files.map((file, index) => (
                                        <InlineStack key={index} align="space-between">
                                            <Text as="p" variant="bodySm">
                                                📎 {file.name}
                                            </Text>
                                            <Badge tone="info">{`${(file.size / 1024).toFixed(2)} KB`}</Badge>
                                        </InlineStack>
                                    ))}
                                </BlockStack>
                            </Card>
                        )}
                    </BlockStack>
                </Modal.Section>
            </Modal>

            {/* Detected Matches Modal */}
            <Modal
                open={matchesModal}
                onClose={() => setMatchesModal(false)}
                title="Detected Matches"
                primaryAction={{
                    content: 'Generate Evidence Package',
                    onAction: handleGeneratePackage,
                }}
                secondaryActions={[
                    {
                        content: 'Close',
                        onAction: () => setMatchesModal(false),
                    },
                ]}
            >
                <Modal.Section>
                    <TextContainer>
                        <Text as="h3" variant="headingSm">
                            Image: {selectedImage?.url}
                        </Text>
                        <BlockStack gap="300">
                            <Text as="p" variant="bodyMd">
                                <strong>Matched Sites:</strong>
                            </Text>

                            <Card>
                                <BlockStack gap="200">
                                    <InlineStack align="space-between">
                                        <Text as="p" variant="bodySm">fake-store-clone.com</Text>
                                        <Badge tone="critical">94% Match</Badge>
                                    </InlineStack>
                                    <Text as="p" variant="bodySm" tone="subdued">
                                        Detected: Jan 15, 2024 at 10:30 AM
                                    </Text>
                                </BlockStack>
                            </Card>

                            <Card>
                                <BlockStack gap="200">
                                    <InlineStack align="space-between">
                                        <Text as="p" variant="bodySm">copycat-shop.net</Text>
                                        <Badge tone="critical">89% Match</Badge>
                                    </InlineStack>
                                    <Text as="p" variant="bodySm" tone="subdued">
                                        Detected: Jan 14, 2024 at 2:45 PM
                                    </Text>
                                </BlockStack>
                            </Card>

                            <Card>
                                <BlockStack gap="200">
                                    <InlineStack align="space-between">
                                        <Text as="p" variant="bodySm">phishing-site.org</Text>
                                        <Badge tone="attention">76% Match</Badge>
                                    </InlineStack>
                                    <Text as="p" variant="bodySm" tone="subdued">
                                        Detected: Jan 13, 2024 at 9:15 AM
                                    </Text>
                                </BlockStack>
                            </Card>
                        </BlockStack>
                    </TextContainer>
                </Modal.Section>
            </Modal>

            {/* Evidence Modal for Safe Images */}
            <Modal
                open={evidenceModal}
                onClose={() => setEvidenceModal(false)}
                title="Image Protection Status"
            >
                <Modal.Section>
                    <TextContainer>
                        <Text as="h3" variant="headingSm">
                            Image: {selectedImage?.url}
                        </Text>
                        <BlockStack gap="200">
                            <Text as="p" variant="bodyMd">
                                <strong>Status:</strong> <Badge tone="success">Safe</Badge>
                            </Text>
                            <Text as="p" variant="bodySm">No unauthorized usage detected</Text>
                            <Text as="p" variant="bodySm" tone="subdued">
                                Last scanned: Jan 16, 2024 at 12:00 PM
                            </Text>
                            <Text as="p" variant="bodySm" tone="subdued">
                                Next scan: Jan 17, 2024 at 12:00 PM
                            </Text>
                        </BlockStack>
                    </TextContainer>
                </Modal.Section>
            </Modal>
        </BlockStack>
    );
};

export default ImageMonitoring;
