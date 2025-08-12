import Pagination from '@mui/material/Pagination';

export default function PaginationControls({ page = 1, count = 10, onChange }: { page?: number; count?: number; onChange?: (event: React.ChangeEvent<unknown>, value: number) => void }) {
  return (
    <div className="flex justify-center mt-8">
      <Pagination
        page={page}
        count={count}
        onChange={onChange}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            fontFamily: 'Metropolis, Red Hat Display, Arial, sans-serif',
            color: '#222222',
          },
        }}
        className="[&_.MuiPaginationItem-root]:bg-white [&_.MuiPaginationItem-root]:border [&_.MuiPaginationItem-root]:border-gray-200"
      />
    </div>
  );
}
