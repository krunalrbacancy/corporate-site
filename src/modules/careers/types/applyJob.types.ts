export type ApplyJobFields = {
  full_name: string,
  email: string,
  phone: string,
  message: string,
};

export type ApplyJobFormData = ApplyJobFields & {
  resume: File | null,
};

export type ApplyJobErrors = ApplyJobFields & {
  resume: string,
}