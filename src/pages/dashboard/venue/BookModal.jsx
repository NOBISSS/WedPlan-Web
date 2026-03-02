import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';

// ─── Reusable Step Indicator ──────────────────────────────────────────
const StepIndicator = ({ currentStep, totalSteps }) => {
    return (
        <div className='flex items-center gap-2 mb-6'>
            {Array.from({ length: totalSteps }, (_, i) => {
                const stepNum = i + 1;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                return (
                    <React.Fragment key={stepNum}>
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                            ${isCompleted || isActive ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                            {isCompleted ? '✓' : stepNum}
                        </span>
                        {stepNum !== totalSteps && (
                            <div className='flex-1 h-1 rounded bg-gray-200'>
                                <div className={`h-1 rounded bg-primary transition-all ${isCompleted ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        )}
                    </React.Fragment>
                )
            })}
        </div>
    )
}

const StepOne = ({setBookVenueModalOpen, eventCategory, setStep, savedData,onStepComplete,stepIndicator}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues:savedData
    });

    const onSubmit = (data) => {
        onStepComplete(data);
        setStep(2);
    }

    return (
        <div>
            <h1 className='text-2xl font-bold text-primary mb-6'>Create Event</h1>
            {/* Step indicator */}
            {stepIndicator}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>

                    {/* Row 1: Title & Description */}
                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col flex-1'>
                            <label htmlFor='title' className='mb-1 font-medium'>Title</label>
                            <input
                                className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                                type='text'
                                id='title'
                                placeholder='Enter title of Event'
                                {...register("title", { required: "Title is required" })}
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label htmlFor='description' className='mb-1 font-medium'>Description</label>
                            <input
                                className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                                type='text'
                                id='description'
                                placeholder='Enter description of Event'
                                {...register("description", { required: "Description is required" })}
                            />
                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                        </div>
                    </div>

                    {/* Row 2: Event Type */}
                    <div className='flex  w-full gap-2'>
                        <div className='w-1/2 '>
                        <label htmlFor='type' className='mb-1 font-medium'>Event Type</label>
                        <select
                            className='py-2 px-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-700'
                            {...register("type", { required: "Event type is required" })}
                            //onChange={(e) => handleChange(e, setStep)}
                        >
                            <option value="">Select an event category</option>
                            {eventCategory.length > 0 && eventCategory.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>}
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label htmlFor='totalBudget' className='mb-1 font-medium'>Budget</label>
                            <input
                                className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                                type='text'
                                id='totalBudget'
                                name='totalBudget'
                                placeholder='Enter budget of Event'
                                {...register("totalBudget", { required: "Budget is required" })}
                            />
                            {errors.totalBudget && <p className="text-red-500 text-sm mt-1">{errors.totalBudget.message}</p>}
                        </div>
                    </div>

                    {/* Row 3: Start Date & End Date */}
                    <div className='flex w-full gap-4'>
                        <div className='flex flex-col flex-1'>
                            <label htmlFor='startDate' className='mb-1 font-medium'>Start Date</label>
                            <input
                                className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                                type='date'
                                id='startDate'
                                {...register("startDate", { required: "Start date is required" })}
                            />
                            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
                        </div>
                        <div className='flex flex-col flex-1'>
                            <label htmlFor='endDate' className='mb-1 font-medium'>End Date</label>
                            <input
                                className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                                type='date'
                                id='endDate'
                                {...register("endDate", { required: "End date is required" })}
                            />
                            {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate.message}</p>}
                        </div>
                    </div>

                </div>

                {/* Buttons */}
                <div className='flex items-center gap-3 mt-6'>
                    <button
                        className='bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-colors'
                        type='submit'
                    >
                        Next
                    </button>
                    <button
                        className='bg-white text-primary border-2 border-primary px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors'
                        type='button'
                        onClick={() => setBookVenueModalOpen(false)}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

const StepTwo = ({ setBookVenueModalOpen, setStep,savedData,onStepComplete,stepIndicator }) => {
    const {register,handleSubmit,formState:{errors}} = useForm({
        defaultValues:savedData
    });

    const onSubmit = (data) => {
        onStepComplete(data);
        setStep(3);
    }   

    return (
        <div className='flex flex-col h-full'>
            <h1 className='text-2xl font-bold text-primary mb-6'>Booking Details</h1>
            {/* Step indicator */}
            {stepIndicator}

            {/* content goes here */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col flex-1'>
                        <label className='mb-1 font-medium'>Total Budget</label>
                        <input
                            className='rounded-md py-2 px-3 border border-gray-300 focus:outline-none focus:border-blue-700 w-full'
                            type='number'
                            placeholder='Enter total budget'
                            {...register("totalBudget", { required: "Budget is required", min: { value: 1, message: "Budget must be greater than 0" } })}
                        />
                        {errors.totalBudget && <p className="text-red-500 text-sm mt-1">{errors.totalBudget.message}</p>}
                    </div>

                    {/* Add more step 2 fields here */}

                </div>

                <div className='flex items-center gap-3 mt-6'>
                    <button className='bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-colors' type='submit'>
                        Next
                    </button>
                    <button className='bg-white text-primary border-2 border-primary px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors' type='button' onClick={() => setStep(1)}>
                        Back
                    </button>
                    <button className='bg-white text-primary border-2 border-primary px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors' type='button' onClick={() => setBookVenueModalOpen(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

const StepThree = ({ setBookVenueModalOpen, setStep, allData, onFinalSubmit,stepIndicator }) => {
    return (
        <div>
            <h1 className='text-2xl font-bold text-primary mb-6'>Review & Confirm</h1>

            {/* Step indicator */}
            {stepIndicator}

            {/* Summary of all collected data */}
            <div className='flex flex-col gap-2 bg-gray-50 rounded-lg p-4 mb-4'>
                <div className='flex justify-between'><span className='text-gray-500'>Title</span><span className='font-medium'>{allData.title}</span></div>
                <div className='flex justify-between'><span className='text-gray-500'>Description</span><span className='font-medium'>{allData.description}</span></div>
                <div className='flex justify-between'><span className='text-gray-500'>Type</span><span className='font-medium'>{allData.type}</span></div>
                <div className='flex justify-between'><span className='text-gray-500'>Start Date</span><span className='font-medium'>{allData.startDate}</span></div>
                <div className='flex justify-between'><span className='text-gray-500'>End Date</span><span className='font-medium'>{allData.endDate}</span></div>
                <div className='flex justify-between'><span className='text-gray-500'>Budget</span><span className='font-medium'>{allData.totalBudget}</span></div>
            </div>

            <div className='flex items-center gap-3 mt-6'>
                <button className='bg-primary text-white px-5 py-2 rounded-md hover:bg-primary/90 transition-colors' type='button' onClick={onFinalSubmit}>
                    Confirm Booking
                </button>
                <button className='bg-white text-primary border-2 border-primary px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors' type='button' onClick={() => setStep(2)}>
                    Back
                </button>
                <button className='bg-white text-primary border-2 border-primary px-5 py-2 rounded-full hover:bg-secondary/80 transition-colors' type='button' onClick={() => setBookVenueModalOpen(false)}>
                    Cancel
                </button>
            </div>
        </div>
    )
}

const BookModal = ({ eventCategory, setBookVenueModalOpen }) => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(1);
    const TOTAL_STEPS=3;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        startDate: "",
        endDate: "",
        totalBudget: ""
    })

    

    const handleStepComplete = (stepData) => {
        setFormData(prev=>({...prev, ...stepData}))
    }

    const handleFinalSubmit = () => {
        // Here you can dispatch your final booking action with formData
        console.log("Final Booking Data:", formData);
        setBookVenueModalOpen(false);
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <StepOne 
                            setBookVenueModalOpen={setBookVenueModalOpen}
                            eventCategory={eventCategory}
                            setStep={setStep}
                            savedData={formData}
                            onStepComplete={handleStepComplete} 
                            stepIndicator={<StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />}
                        />
            case 2:
                return <StepTwo
                            setBookVenueModalOpen={setBookVenueModalOpen}
                            setStep={setStep}
                            savedData={formData}
                            onStepComplete={handleStepComplete} 
                            stepIndicator={<StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />}
                        />
            case 3:
                return <StepThree
                            setBookVenueModalOpen={setBookVenueModalOpen}
                            setStep={setStep}
                            allData={formData}
                            onFinalSubmit={handleFinalSubmit}
                            stepIndicator={<StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} />}
                         />
            default:
                return null;
        }
    }
    return (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
            <div className='bg-white w-full max-w-2xl max-h-[90vh] rounded-xl shadow-xl flex flex-col overflow-hidden'>
                <div className='flex flex-col p-8 overflow-y-auto h-full'>
                    {renderStep()}
                </div>
            </div>
        </div>
    )
}

export default BookModal;