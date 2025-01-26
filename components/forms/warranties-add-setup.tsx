"use client";
import React, {useState} from "react";
import { Button } from "../ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const WarrantiesAddSetup = () => {
    const [description, setDescription] = useState("");
    const maxCharacters = 4000;

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        if (input.length <= maxCharacters) {
            setDescription(input);
        }
    };


    return (
        <div className="pt-6 w-full flex lg:flex-row flex-col gap-6">
            <form className="space-y-6 lg:w-1/2 w-full">
                <div className="space-y-6 w-full">
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="pseudo-name">
                            Pseudo Name
                            <span className="text-red-500"> *</span>
                        </Label>
                        <Input type="text" placeholder="Pseudo Name" id="pseudo-name" className="w-full" />

                    </div>
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="igis">
                            IGIS Warranty Code
                            <span className="text-red-500"> *</span>
                        </Label>
                        <Input type="text" placeholder="Pseudo Name" id="igis" className="w-full" />

                    </div>
                    <div className="space-y-2">
                        <Label className="text-charcoal" htmlFor="warranty-description">
                            Warranty Description
                            <span className="text-red-500"> *</span>
                        </Label>
                        <Textarea
                            rows={5}
                            id="warranty-description"
                            className="resize-none"
                            placeholder="Warranty Description"
                            value={description}
                            onChange={handleInputChange}
                        />
                        <div className="text-sm text-gray-500">
                            {description.length}/{maxCharacters} characters
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className='text-charcoal' htmlFor="logo">
                            Default
                        </Label>
                        <RadioGroup defaultValue="yes">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label className='text-charcoal' htmlFor="yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label className='text-charcoal' htmlFor="no">No</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </div>

                <div className="flex md:flex-row flex-col gap-4">
                    <Button variant="primary" size="lg" className="md:w-max w-full" type="submit">
                        Submit
                    </Button>
                    <Button variant="secondary" size="lg" className="md:w-max w-full" type="button">
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default WarrantiesAddSetup;
