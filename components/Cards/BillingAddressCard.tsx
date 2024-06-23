import { useState } from "react";
import { indianStates } from "@/constants";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { BillingFormType } from "@/types/billing-form.type";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface Props {
    formState: BillingFormType;
    handleChange: (field: string, value: string) => void;
}

export default function BillingAddressComponent({
    formState,
    handleChange,
}: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter your name"
                            value={formState.name}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                            onValueChange={(value) =>
                                handleChange("country", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="IN">India</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address1">Address Line 1</Label>
                    <Input
                        id="address1"
                        placeholder="Enter your address"
                        value={formState.address1}
                        onChange={(e) =>
                            handleChange("address1", e.target.value)
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address2">Address Line 2</Label>
                    <Input
                        id="address2"
                        placeholder="Apartment, suite, etc. (optional)"
                        value={formState.address2}
                        onChange={(e) =>
                            handleChange("address2", e.target.value)
                        }
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                            id="city"
                            placeholder="Enter your city"
                            value={formState.city}
                            onChange={(e) =>
                                handleChange("city", e.target.value)
                            }
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                            onValueChange={(value) =>
                                handleChange("state", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                                {indianStates.map((state) => (
                                    <SelectItem key={state} value={state}>
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input
                            id="zip"
                            placeholder="Enter your zip code"
                            value={formState.zip}
                            onChange={(e) =>
                                handleChange("zip", e.target.value)
                            }
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
