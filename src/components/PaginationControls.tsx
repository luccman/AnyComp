import Pagination from '@mui/material/Pagination';

interface Props {
  page: number;          // 1-based for UI
  count: number;         // total pages
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function PaginationControls({ page, count, onChange }: Props) {
  if (count <= 1) return null;
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        siblingCount={1}
        boundaryCount={1}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            fontFamily: 'Metropolis, Red Hat Display, Arial, sans-serif',
            color: '#222222'
          }
        }}
        className="[&_ .MuiPaginationItem-root]:bg-white [&_ .MuiPaginationItem-root]:border [&_ .MuiPaginationItem-root]:border-gray-200"
      />
    </div>
  );
}
