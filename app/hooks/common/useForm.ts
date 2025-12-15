import { useState, ChangeEvent, FormEvent } from "react";

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        await onSubmit(values);
      }
    } else {
      await onSubmit(values);
    }

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  };
}

// import { useForm } from '@/hooks/common/useForm';

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// const LoginComponent = () => {
//   // 초기값 설정
//   const initialValues: LoginFormValues = {
//     email: '',
//     password: ''
//   };

//   // 유효성 검사 함수
//   const validateForm = (values: LoginFormValues) => {
//     const errors: Partial<Record<keyof LoginFormValues, string>> = {};

//     if (!values.email) {
//       errors.email = '이메일을 입력해주세요';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
//       errors.email = '올바른 이메일 형식이 아닙니다';
//     }

//     if (!values.password) {
//       errors.password = '비밀번호를 입력해주세요';
//     } else if (values.password.length < 6) {
//       errors.password = '비밀번호는 최소 6자 이상이어야 합니다';
//     }

//     return errors;
//   };

//   // 폼 제출 처리
//   const handleSubmit = async (values: LoginFormValues) => {
//     try {
//       // API 호출 등 로그인 처리
//       console.log('로그인 시도:', values);
//     } catch (error) {
//       console.error('로그인 실패:', error);
//     }
//   };

//   // useForm 훅 사용
//   const { values, errors, isSubmitting, handleChange, handleSubmit: onSubmit } = useForm({
//     initialValues,
//     onSubmit: handleSubmit,
//     validate: validateForm
//   });

//   return (
//     <form onSubmit={onSubmit}>
//       <div>
//         <input
//           type="email"
//           name="email"
//           value={values.email}
//           onChange={handleChange}
//           placeholder="이메일"
//         />
//         {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
//       </div>

//       <div>
//         <input
//           type="password"
//           name="password"
//           value={values.password}
//           onChange={handleChange}
//           placeholder="비밀번호"
//         />
//         {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
//       </div>

//       <button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? '로그인 중...' : '로그인'}
//       </button>
//     </form>
//   );
// };

// export default LoginComponent;
