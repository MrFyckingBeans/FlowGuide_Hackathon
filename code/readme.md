# Manuals-Creator and Manuals-Viewer App (Next.js)

## Routes

### 1. Dashboard (`/dashboard`)
- **Route**: `/dashboard`
- **Components**:
  - `CreateManual` - Interface to create new manuals
  - `GeneratedManuals` - Displays a list of generated manuals

### 2. Create New Manuals (`/create-manual`)
- **Route**: `/create-manual`
- **Components**:
  - `ManualDetailsForm` - Title of the Manual and possibilty of changing it
  - `ImageUpload` - Allows picture upload and reordering 
  - `GenerateManual` - Interface for generating the manual

### 3. Manual Viewer (`/manual/[id]`)
- **Dynamic Route**: `/manual/[id]`
- **Components**:
  - `StepByStepView` - Displays each step with an image and description
  - `NavigationButtons` - Back, Next buttons, and optional Progress Bar
  - `LostHelp` - Allows user to upload an image, ask a question, or download a PDF if they are lost

### 4. Manual Feedback (`/manual/[id]/feedback`)
- **Route**: `/manual/[id]/feedback`
- **Components**:
  - `Take Picture` - Possiblity for user to take picture of the problem
  - `Upload Picture` - Possiblity for user to upload picture of the problem
  - `FeedbackForm` - Collects user feedback on the manual
  - `SubmitButton` - Button to submit feedback

## Hooks and Functionality

### Dashboard
- **Data Fetching Hook**: `useManuals`
  - Fetches all existing manuals to be displayed in the `GeneratedManuals` component.
- **State Management Hook**: `useState`
  - Manages which view to display (e.g., `CreateManual`, `GeneratedManuals`).

### Create New Manuals
- **Form Hook**: `useForm` (e.g., with React Hook Form)
  - Handles input for the manual’s title and details within `ManualDetailsForm`.
- **Image Handling Hook**: `useImageUploader`
  - Manages image uploads and allows users to reorder images within the `ImageUpload` component.
- **Generate Functionality Hook**: `useGenerateManual`
  - Handles the generation of the manual, tracking states such as "Generating" or "Generated".

### Manual Viewer
- **Step Navigation Hook**: `useStepNavigation`
  - Manages the `StepByStepView` component for navigating between manual steps, including Back and Next button functionality and optional Progress Bar updates.
- **Lost Help Hook**: `useLostHelp`
  - Handles user-uploaded images, question submissions, and PDF downloads for when users select the "I'm Lost" option.

### Manual Feedback
- **Feedback Hook**: `useFeedback`
  - Collects feedback from users on specific manual steps or general comments, managing data within `FeedbackForm`.
- **Image Capture/Upload Hook**: `useImageCapture`
  - Manages taking or uploading images of the problem for user feedback in `Take Picture` and `Upload Picture` components.
- **Submit Feedback Hook**: `useSubmitFeedback`
  - Handles the feedback submission process when users select the `SubmitButton`.

