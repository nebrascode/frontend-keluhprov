import { FaPlus } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";

export default function ButtonNews({ onClick, mode }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = mode === "edit";

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (isEditMode) {
            navigate(`/news-detail/${id}/edit`);
        } else {
            navigate(`/news-create`);
        }
    };

    return (
        <button
            className="bg-main-color hover:bg-main-darker rounded justify-center px-6 py-2.5 items-center gap-2 inline-flex"
            onClick={handleClick}
        >
            {isEditMode ? <FiEdit /> : <FaPlus />}
            <div className="text-center text-violet-950 text-sm font-medium leading-tight tracking-tight">
                {isEditMode ? "Edit Berita" : "Tambah Berita"}
            </div>
        </button>
    );
}