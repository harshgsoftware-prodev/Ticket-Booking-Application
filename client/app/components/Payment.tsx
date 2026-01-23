import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { Card, Button, Text, Flex, Badge } from "@radix-ui/themes";

import api from "../lib/api";

export default function Payment({ myLockSeats, onSuccess, onFail }: any) {
    const [amountPay, setAmountPay] = useState(0);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        const totalAmount = 200 * myLockSeats.length;
        setAmountPay(totalAmount);
    }, [myLockSeats]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements || amountPay === 0) return;

        setLoading(true);

        try {
            const res = await api.post("/payment/initPayment", {
                amount: amountPay,
            });

            const { clientSecret } = res.data;

            const result = await stripe?.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements?.getElement(CardElement)!,
                },
            });

            if (result.error) {
                setStatus("error");
                return;
            }

            if (result?.paymentIntent?.status === "succeeded") {
                await api.post("/seats/confirm-multiple", {
                    seatIds: myLockSeats.map((s: any) => s._id),
                });
                setStatus("success");
            }

            setTimeout(() => {
                onSuccess();
            }, 2000);
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
            onFail();
        } finally {
            setLoading(false);
        }
    };

    const handleCancelPayment = async () => {
        await api.post("/seats/cancel-my-locked");
        onFail();
    };

    if (myLockSeats.length === 0) return null;

    return (
        <Card style={{ width: 360 }}>
            {/* Success */}
            {status === "success" && (
                <Flex direction="column" align="center" gap="3">
                    <Badge color="green" size="3">
                        Payment Successful
                    </Badge>

                    <Text size="3" align="center">
                        {myLockSeats.length} seat(s) confirmed
                    </Text>

                    <Text size="2" color="gray">
                        Redirecting...
                    </Text>
                </Flex>
            )}

            {/* Error */}
            {status === "error" && (
                <Flex direction="column" gap="3">
                    <Button
                        variant="soft"
                        color="red"
                        onClick={handleCancelPayment}
                    >
                        Payment Failed!!! Go Back
                    </Button>
                </Flex>
            )}

            <form onSubmit={handleSubmit}>
                <Text weight="bold" size="4">
                    Pay ₹{amountPay}
                </Text>

                {/* STRIPE CARD INPUT */}
                <div
                    style={{
                        marginTop: 12,
                        padding: "12px",
                        border: "1px solid #e5e7eb",
                        borderRadius: 8,
                        background: "white",
                    }}
                >
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: "16px",
                                    color: "#111827",
                                    "::placeholder": {
                                        color: "#9ca3af",
                                    },
                                },
                                invalid: {
                                    color: "#dc2626",
                                },
                            },
                        }}
                    />
                </div>

                <Flex gap="3" mt="4">
                    <Button
                        type="submit"
                        loading={loading}
                        disabled={!stripe || loading}
                        style={{ flex: 1 }}
                    >
                        Pay ₹{amountPay}
                    </Button>

                    <Button
                        type="button"
                        variant="soft"
                        color="red"
                        onClick={handleCancelPayment}
                        disabled={loading}
                        style={{ flex: 1 }}
                    >
                        Cancel
                    </Button>
                </Flex>
            </form>
        </Card>
    );
}
