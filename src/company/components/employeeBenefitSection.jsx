import React, { useEffect, useState } from "react";
import {
  Chip,
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Plus, X, Check } from "lucide-react";
import {
  addBenefit,
  getBenefits,
  removeBenefit,
} from "../../services/companyService";

const EmployeeBenefitsSection = ({ profile }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBenefit, setNewBenefit] = useState("");
  const [benefits, setBenefits] = useState(null); // Set to null for better loading state
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    const fetchBenefits = async () => {
      if (profile?.uid) {
        const fetchedBenefits = await getBenefits(profile.uid);
        setBenefits(fetchedBenefits || []);
      } else {
        setBenefits([]); // Ensures no delay in rendering
      }
    };

    fetchBenefits();
  }, [profile?.uid]);

  const handleAddBenefit = async () => {
    if (!newBenefit.trim()) {
      setInputError("Please enter a benefit");
      return;
    }

    const success = await addBenefit(profile?.uid, newBenefit.trim());
    if (success) {
      setBenefits((prev) =>
        prev ? [...prev, newBenefit.trim()] : [newBenefit.trim()]
      );
    }

    setNewBenefit("");
    setInputError("");
    onClose();
  };

  const handleRemoveBenefit = async (benefit) => {
    const success = await removeBenefit(profile?.uid, benefit);
    if (success) {
      setBenefits((prev) => prev?.filter((b) => b !== benefit) || []);
    }
  };

  return (
    <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-indigo-700">
          Employee Benefits
        </h3>
        <Button
          size="sm"
          color="primary"
          variant="flat"
          onPress={onOpen}
          startContent={<Plus size={16} />}
          className="bg-indigo-100 text-indigo-700 border-indigo-200"
        >
          Add Benefit
        </Button>
      </div>

      {/* Handle loading state first */}
      {benefits === null ? (
        <p className="text-gray-500 text-center">Loading benefits...</p>
      ) : benefits.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {benefits.map((benefit, index) => (
            <Chip
              key={index}
              variant="flat"
              className="bg-indigo-100 text-indigo-700 font-medium"
              endContent={
                <button
                  className="ml-1 text-indigo-400 hover:text-indigo-700 transition-colors"
                  onClick={() => handleRemoveBenefit(benefit)}
                >
                  <X size={14} />
                </button>
              }
            >
              {benefit}
            </Chip>
          ))}
        </div>
      ) : (
        <div className="bg-white bg-opacity-50 p-4 rounded-lg border border-dashed border-indigo-200 text-center">
          <p className="text-gray-500 mb-2">No benefits listed yet.</p>
          <Button
            size="sm"
            color="primary"
            variant="flat"
            onPress={onOpen}
            startContent={<Plus size={16} />}
            className="bg-indigo-100 text-indigo-700 mt-1"
          >
            Add Your First Benefit
          </Button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="text-indigo-700">
            Add Employee Benefit
          </ModalHeader>
          <ModalBody>
            <Input
              label="Benefit"
              placeholder="Enter a benefit (e.g., Health Insurance)"
              value={newBenefit}
              onChange={(e) => {
                setNewBenefit(e.target.value);
                if (e.target.value.trim()) setInputError("");
              }}
              color={inputError ? "danger" : "primary"}
              errorMessage={inputError}
              autoFocus
            />
            <p className="text-sm text-gray-500 mt-2">
              Add specific benefits that make your company attractive to
              potential employees.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onPress={handleAddBenefit}
              startContent={<Check size={16} />}
            >
              Add Benefit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EmployeeBenefitsSection;
