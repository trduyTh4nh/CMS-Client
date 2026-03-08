
export interface BannerData {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    ctaText: string;
    tag: string;
    colorScheme: 'blue' | 'purple' | 'emerald' | 'orange';
}

export type BannerAction = (id: string) => void;

export const INITIAL_BANNERS: BannerData[] = [
    {
        id: '1',
        title: 'Hệ Thống CMS Toàn Diện',
        subtitle: 'Production-Level Architecture',
        description: 'Quản lý nội dung, người dùng và vận hành hệ thống ở quy mô thực tế với hiệu năng vượt trội.',
        imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1600',
        ctaText: 'Khám Phá Core',
        tag: 'ARCHITECTURE',
        colorScheme: 'blue'
    },
    {
        id: '2',
        title: 'Cộng Đồng Lập Trình Viên',
        subtitle: 'Connect & Collaborate',
        description: 'Nơi hội tụ những kỹ sư phần mềm hàng đầu, chia sẻ kiến thức và cùng nhau xây dựng tương lai.',
        imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600',
        ctaText: 'Tham Gia Ngay',
        tag: 'COMMUNITY',
        colorScheme: 'purple'
    },
    {
        id: '3',
        title: 'Hạ Tầng Cloud Native',
        subtitle: 'Scale with Confidence',
        description: 'Tận dụng sức mạnh của Kubernetes và Docker để triển khai ứng dụng của bạn một cách nhanh chóng.',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600',
        ctaText: 'Xem Tài Liệu',
        tag: 'DEVOPS',
        colorScheme: 'emerald'
    }
];

export const COLOR_CLASSES = {
    blue: 'from-blue-600 to-indigo-700',
    purple: 'from-purple-600 to-pink-700',
    emerald: 'from-emerald-600 to-teal-700',
    orange: 'from-orange-600 to-red-700'
};
