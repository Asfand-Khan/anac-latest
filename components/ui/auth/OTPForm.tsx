import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useState } from "react"
import { Button } from "../button"
import { Mail, MessageSquareMore } from "lucide-react"

const OTPForm = () => {

    const [showOTP, setShowOTP] = useState(false)
    const handleShowOTP = () => {
        setShowOTP(!showOTP)
    }
    return (
        <>
            {
                showOTP ? <InputOTP maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP> :
                    <div className="flex flex-col justify-center items-center gap-4 w-full">
                        <Button variant="secondary" className="w-full" size="lg" type="button" onClick={handleShowOTP}>
                            <Mail className="stroke-[3]" />
                            Email
                        </Button>
                        <Button variant="secondary" className="w-full" size="lg" type="button" onClick={handleShowOTP}>
                            <MessageSquareMore className="stroke-[3]" />
                            SMS
                        </Button>
                    </div>
            }
        </>
    )
}

export default OTPForm