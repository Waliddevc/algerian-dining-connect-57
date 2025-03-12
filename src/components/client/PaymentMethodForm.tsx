
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreditCard, Wallet, Euro } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  RadioGroup,
  RadioGroupItem
} from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the form schema with validation
const paymentFormSchema = z.object({
  paymentMethod: z.enum(["card", "cash", "wallet"], {
    required_error: "Veuillez sélectionner un mode de paiement",
  }),
  cardNumber: z.string().optional().refine(
    (val) => !val || /^[0-9]{16}$/.test(val),
    { message: "Le numéro de carte doit contenir 16 chiffres" }
  ),
  cardName: z.string().optional(),
  expiryDate: z.string().optional().refine(
    (val) => !val || /^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(val),
    { message: "Format de date d'expiration invalide (MM/YY)" }
  ),
  cvv: z.string().optional().refine(
    (val) => !val || /^[0-9]{3,4}$/.test(val),
    { message: "Le CVV doit contenir 3 ou 4 chiffres" }
  ),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentMethodFormProps {
  onSubmit: (values: PaymentFormValues) => void;
  onCancel: () => void;
  total: number;
}

export const PaymentMethodForm = ({ onSubmit, onCancel, total }: PaymentMethodFormProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "card",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const handleSubmit = (values: PaymentFormValues) => {
    onSubmit(values);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Méthode de paiement</CardTitle>
        <CardDescription>
          Choisissez votre méthode de paiement préférée
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mode de paiement</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedMethod(value);
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/10">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="cursor-pointer flex items-center">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Carte bancaire
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/10">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="cursor-pointer flex items-center">
                          <Euro className="h-4 w-4 mr-2" />
                          Espèces à la livraison
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-accent/10">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="cursor-pointer flex items-center">
                          <Wallet className="h-4 w-4 mr-2" />
                          Portefeuille digital
                        </Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedMethod === "card" && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro de carte</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456" 
                          {...field} 
                          required
                          onChange={(e) => {
                            // Format to show spaces every 4 digits, but store without spaces
                            const value = e.target.value.replace(/\s/g, "");
                            if (value.length <= 16 && /^\d*$/.test(value)) {
                              field.onChange(value);
                              e.target.value = value.replace(/(.{4})/g, "$1 ").trim();
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titulaire de la carte</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du titulaire" {...field} required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date d'expiration</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY" 
                            {...field} 
                            required
                            onChange={(e) => {
                              let value = e.target.value.replace(/[^\d]/g, "");
                              if (value.length <= 4) {
                                if (value.length > 2) {
                                  value = value.slice(0, 2) + "/" + value.slice(2);
                                }
                                field.onChange(value.includes("/") ? value : value);
                                e.target.value = value.includes("/") ? value : value;
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            {...field} 
                            required
                            type="password"
                            maxLength={4}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "");
                              if (value.length <= 4) {
                                field.onChange(value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {selectedMethod === "wallet" && (
              <div className="py-2 text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Vous serez redirigé vers notre partenaire de paiement digital.
                </p>
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total à payer</span>
                <span>{total.toFixed(2)}€</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button type="submit">
                Payer {total.toFixed(2)}€
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodForm;
