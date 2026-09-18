"use client";

import { FormEvent, useState } from "react";

export default function EnquiryPage() {
  const [fulfilment, setFulfilment] = useState("pickup");
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const [ackEstimate, setAckEstimate] = useState(false);
  const [ackSafety, setAckSafety] = useState(false);

  const [error, setError] = useState("");

  function handleChange(
    field: string,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.mobile.trim()) {
      setError("Please enter your mobile number.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (fulfilment === "delivery" && !formData.address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (!ackEstimate) {
      setError(
        "Please accept the enquiry estimate acknowledgement."
      );
      return;
    }

    if (!ackSafety) {
      setError(
        "Please accept the safety and legal acknowledgement."
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50">

        {/* HEADER */}
        <header className="bg-red-900 text-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

            <div>
              <h1 className="text-2xl font-bold">
                Muniraj Crackers
              </h1>

              <p className="text-sm text-red-200">
                Enquiry
              </p>
            </div>

            <a
              href="/catalogue"
              className="rounded-lg bg-white px-5 py-3 font-semibold text-red-900"
            >
              Catalogue
            </a>

          </div>
        </header>

        {/* SUCCESS / NEXT STEP */}
        <section className="mx-auto max-w-3xl px-6 py-16">

          <div className="rounded-2xl bg-white p-8 text-center shadow-md">

            <div className="text-6xl">
              💬
            </div>

            <h2 className="mt-5 text-3xl font-bold text-gray-900">
              Enquiry Details Ready
            </h2>

            <p className="mt-4 text-gray-600">
              Your enquiry information has been validated.
            </p>

            <div className="mt-6 rounded-xl bg-yellow-50 p-5 text-left">

              <p className="font-semibold text-gray-900">
                WhatsApp
              </p>

              <p className="mt-2 text-sm text-gray-700">
                WhatsApp connection will be added after the
                business WhatsApp number is configured.
              </p>

            </div>

            <a
              href="/cart"
              className="mt-6 inline-block rounded-lg bg-red-800 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              ← Back to Cart
            </a>

          </div>

        </section>

      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <header className="bg-red-900 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              Muniraj Crackers
            </h1>

            <p className="text-sm text-red-200">
              Enquiry Form
            </p>
          </div>

          <a
            href="/cart"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-red-900 hover:bg-gray-100"
          >
            ← Cart
          </a>

        </div>
      </header>

      {/* FORM */}
      <section className="mx-auto max-w-3xl px-6 py-10">

        <div className="mb-8">

          <h2 className="text-4xl font-bold text-gray-900">
            Send an Enquiry
          </h2>

          <p className="mt-3 text-gray-600">
            Enter your details to prepare your product enquiry.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-6 shadow-md sm:p-8"
        >

          {/* ERROR */}
          {error && (
            <div
              aria-live="polite"
              className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              {error}
            </div>
          )}

          {/* NAME */}
          <div className="mb-6">

            <label
              htmlFor="name"
              className="mb-2 block font-semibold text-gray-900"
            >
              Customer Name *
            </label>

            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
            />

          </div>

          {/* MOBILE */}
          <div className="mb-6">

            <label
              htmlFor="mobile"
              className="mb-2 block font-semibold text-gray-900"
            >
              Mobile Number *
            </label>

            <input
              id="mobile"
              type="tel"
              inputMode="numeric"
              maxLength={10}
              value={formData.mobile}
              onChange={(e) =>
                handleChange(
                  "mobile",
                  e.target.value.replace(/\D/g, "")
                )
              }
              placeholder="10-digit mobile number"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
            />

            <p className="mt-2 text-xs text-gray-500">
              Your number is used only for preparing the enquiry.
            </p>

          </div>

          {/* FULFILMENT */}
          <div className="mb-6">

            <label className="mb-3 block font-semibold text-gray-900">
              Preferred Fulfilment *
            </label>

            <div className="grid gap-4 sm:grid-cols-2">

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 hover:bg-gray-50">

                <input
                  type="radio"
                  name="fulfilment"
                  value="pickup"
                  checked={fulfilment === "pickup"}
                  onChange={(e) =>
                    setFulfilment(e.target.value)
                  }
                />

                <span className="font-medium">
                  Pickup
                </span>

              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-300 p-4 hover:bg-gray-50">

                <input
                  type="radio"
                  name="fulfilment"
                  value="delivery"
                  checked={fulfilment === "delivery"}
                  onChange={(e) =>
                    setFulfilment(e.target.value)
                  }
                />

                <span className="font-medium">
                  Delivery
                </span>

              </label>

            </div>

          </div>

          {/* ADDRESS */}
          {fulfilment === "delivery" && (
            <div className="mb-6">

              <label
                htmlFor="address"
                className="mb-2 block font-semibold text-gray-900"
              >
                Delivery Address *
              </label>

              <textarea
                id="address"
                rows={4}
                value={formData.address}
                onChange={(e) =>
                  handleChange("address", e.target.value)
                }
                placeholder="Enter complete delivery address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
              />

            </div>
          )}

          {/* DATE + TIME */}
          <div className="mb-6 grid gap-5 sm:grid-cols-2">

            <div>

              <label
                htmlFor="date"
                className="mb-2 block font-semibold text-gray-900"
              >
                Preferred Date
              </label>

              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  handleChange("date", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
              />

            </div>

            <div>

              <label
                htmlFor="time"
                className="mb-2 block font-semibold text-gray-900"
              >
                Preferred Time
              </label>

              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  handleChange("time", e.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
              />

            </div>

          </div>

          {/* NOTES */}
          <div className="mb-6">

            <label
              htmlFor="notes"
              className="mb-2 block font-semibold text-gray-900"
            >
              Notes
            </label>

            <textarea
              id="notes"
              rows={4}
              maxLength={500}
              value={formData.notes}
              onChange={(e) =>
                handleChange("notes", e.target.value)
              }
              placeholder="Any additional requirements..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-800"
            />

            <p className="mt-1 text-right text-xs text-gray-500">
              {formData.notes.length}/500
            </p>

          </div>

          {/* ACKNOWLEDGEMENTS */}
          <div className="space-y-4 rounded-xl bg-gray-50 p-5">

            <label className="flex cursor-pointer gap-3">

              <input
                type="checkbox"
                checked={ackEstimate}
                onChange={(e) =>
                  setAckEstimate(e.target.checked)
                }
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                I understand this is an enquiry estimate,
                not a confirmed online order. *
              </span>

            </label>

            <label className="flex cursor-pointer gap-3">

              <input
                type="checkbox"
                checked={ackSafety}
                onChange={(e) =>
                  setAckSafety(e.target.checked)
                }
                className="mt-1 h-4 w-4"
              />

              <span className="text-sm text-gray-700">
                I have read the safety and legal notice. *
              </span>

            </label>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-red-800 px-6 py-4 text-lg font-bold text-white hover:bg-red-700 active:scale-[0.99]"
          >
            Prepare Enquiry
          </button>

          <p className="mt-4 text-center text-xs text-gray-500">
            Final pricing and availability require seller confirmation.
          </p>

        </form>

      </section>

      {/* FOOTER */}
      <footer className="bg-red-950 px-6 py-8 text-center text-white">

        <h3 className="text-xl font-bold">
          Muniraj Crackers
        </h3>

        <p className="mt-2 text-sm text-red-300">
          Enquiry Only • Seller Confirmation Required
        </p>

        <p className="mt-4 text-sm text-red-400">
          © 2026 Muniraj Crackers
        </p>

      </footer>

    </main>
  );
}