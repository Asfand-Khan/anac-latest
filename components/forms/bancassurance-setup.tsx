"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const BancassuranceSetup = () => {
    const [selectedColor, setSelectedColor] = useState('#ba0c2f');
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleColorChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSelectedColor(e.target.value);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
                alert("Only JPEG or PNG files are allowed.");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                alert("File size exceeds 5MB. Please upload a smaller file.");
                return;
            }

            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
            setFileName(file.name);
        }
    };

    const triggerLogoInput = () => {
        const fileInput = document.getElementById("logo-upload") as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };


    return (
        <div className="pt-6 lg:w-1/2 w-full">
            <form className="space-y-6">
                {/* Logo Upload Field */}
                <div className="space-y-2">
                    <Label className='text-charcoal' htmlFor="logo">
                        Logo<span className="text-red-500"> *</span>
                    </Label>
                    <div className="flex items-center gap-4">
                        {/* Image Preview */}
                        <div
                            onClick={triggerLogoInput}
                            className="cursor-pointer w-[70px] h-[70px] bg-gray-100 border border-charcoal border-dashed rounded-xl flex items-center justify-center object-cover"
                        >
                            {preview ? (
                                <Avatar className="h-[70px] w-[70px] rounded-xl">
                                    <AvatarImage src={preview} alt="Uploaded Profile" />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                            ) : (
                                <>
                                    <div className="group flex items-center justify-center h-full">
                                        <p className="text-gray-400 text-sm text-center group-hover:hidden transition-all">No Image</p>
                                        <p className="text-gray-400 text-sm text-center hidden group-hover:flex transition-all">Upload</p>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Upload Button */}
                        <div>
                            <input
                                id="logo-upload"
                                type="file"
                                accept="image/jpeg, image/png"
                                className="hidden"
                                onChange={handleLogoUpload}
                            />
                            <Button
                                variant="outline"
                                className="flex items-center space-x-2"
                                type="button"
                                onClick={triggerLogoInput}
                            >
                                <span>Upload Logo</span>
                            </Button>
                        </div>
                    </div>
                    {fileName && (
                        <p className="text-gray-400 text-sm mt-1">{fileName}</p>
                    )}
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                    <Label className='text-charcoal' htmlFor="name">
                        Name<span className="text-red-500"> *</span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter Name"
                        className="w-full"
                        id="name"
                        required
                    />
                </div>

                {/* Banca Code Field */}
                <div className="space-y-2">
                    <Label className='text-charcoal' htmlFor="bancaCode">
                        Banca Code<span className="text-red-500"> *</span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter Banca Code"
                        className="w-full"
                        id="bancaCode"
                        required
                    />
                </div>

                {/* Dashboard Title Field */}
                <div className="space-y-2">
                    <Label className='text-charcoal' htmlFor="dashboardTitle">
                        Dashboard Title<span className="text-red-500"> *</span>
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter Dashboard Title"
                        className="w-full"
                        id="dashboardTitle"
                        required
                    />
                </div>

                {/* Color Picker Field */}
                <div className='space-y-2'>
                    <Label className='text-charcoal' htmlFor="color">
                        Color<span className="text-red-500"> *</span>
                    </Label>
                    <Label htmlFor="color" className="text-charcoal flex justify-between items-center h-11 w-full rounded-lg border border-[#e5e7eb] bg-transparent px-3 py-1 text-xs font-normal shadow-sm transition-colors">
                        <span
                            className={`ml-2 font-normal text-xs text-charcoal`}
                        >
                            {selectedColor.toUpperCase()}
                        </span>
                        <input
                            type="color"
                            id='color'
                            className='bg-transparent w-[15%] cursor-pointer'
                            value={selectedColor}
                            onChange={handleColorChange}
                            title="Select Color"
                        />
                    </Label>
                </div>

                {/* Status Field */}
                <div className="space-y-2">
                    <Label className='text-charcoal' htmlFor="logo">
                        Status
                    </Label>
                    <RadioGroup defaultValue="active">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="active" id="active" />
                            <Label className='text-charcoal' htmlFor="active">Active</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="inactive" id="inactive" />
                            <Label className='text-charcoal' htmlFor="inactive">Inactive</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Submit Button */}
                <Button variant="primary" size="lg" className="md:w-max w-full" type="button">
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default BancassuranceSetup;