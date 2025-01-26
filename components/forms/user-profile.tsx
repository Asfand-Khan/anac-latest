"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Eye, EyeOff } from "lucide-react"
import { Label } from "../ui/label";

const UserProfileForm = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size exceeds 5MB. Please upload a smaller file.");
                return;
            }

            const fileURL = URL.createObjectURL(file);
            setPreview(fileURL);
            setFileName(file.name);
        }
    };

    const triggerFileInput = () => {
        const fileInput = document.getElementById("upload-button") as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <>
            <div className="pt-6 lg:w-1/2 w-full">
                <form className="space-y-6">
                    {/* Profile Picture Upload */}
                    <div className="space-y-2">
                        <Label className="text-base font-medium text-gray-900">Profile picture</Label>
                        <div className="flex items-center gap-4">
                            {/* Clickable Image Preview */}
                            <div
                                onClick={triggerFileInput}
                                className="cursor-pointer w-[70px] h-[70px] bg-gray-100 border border-charcoal border-dashed rounded-xl flex items-center justify-center object-cover"
                            >
                                {preview ? (
                                    <Avatar className="h-[70px] w-[70px] rounded-xl">
                                        <AvatarImage src={preview} alt="Uploaded Profile" />
                                        <AvatarFallback className="rounded-lg">IMG</AvatarFallback>
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

                            {/* Upload button */}
                            <div>
                                <input
                                    id="upload-button"
                                    type="file"
                                    accept="image/jpeg, image/png"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2"
                                    type="button"
                                    size="lg"
                                    onClick={triggerFileInput}
                                >
                                    <Upload />
                                    <span>Upload</span>
                                </Button>
                            </div>
                        </div>
                        {
                            fileName && (<p className="text-charcoal text-sm text-start">{fileName}</p>)
                        }
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="email">
                            Email<span className="text-red-500"> *</span>
                        </Label>
                        <Input type="email" placeholder="Email" id="email" className="w-full" />

                    </div>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="full-name">
                            Full Name<span className="text-red-500"> *</span>
                        </Label>
                        <Input type="text" placeholder="Full Name" id="full-name" className="w-full" />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="phone">
                            Phone<span className="text-red-500"> *</span>
                        </Label>
                        <Input type="tel" id="phone" placeholder="Phone" className="w-full" />
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="password">
                            Password<span className="text-red-500"> *</span>
                        </Label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} placeholder="Password" id="password" className="w-full" />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-3 flex items-center w-[16px]"
                            >
                                {showPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>


                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="confirm-password">
                            Confirm Password<span className="text-red-500"> *</span>
                        </Label>
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} id="confirm-password" placeholder="Confirm Password" className="w-full" />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-3 flex items-center w-[16px]"
                            >
                                {showConfirmPassword ? <Eye /> : <EyeOff />}
                            </button>
                        </div>
                    </div>


                    {/* Submit Button */}
                    <Button variant="primary" size="lg" className="md:w-max w-full" type="button">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
};

export default UserProfileForm;
