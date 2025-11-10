import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetApiCall } from '../helper/axios';
import { commonFunction } from '../helper/commonFunction';

export const useStatusCheck = () => {
  const [showModal, setShowModal] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(false);

  const { status, store_data } = useSelector((store) => store.commonData);
  const token = store_data?.token;

  const checkStatus = async () => {
    setLoading(true);
    try {
      if (!token) return;

      // Use direct API call with authentication header
      const headers = {
        'authentication': token,
        'Content-Type': 'application/json'
      };

      const response = await GetApiCall('GET', `/check-status`, headers);
      
      if (response.data.status) {
        const data = response.data.data;
        setStatusData(data);
        
        // Show modal if popup should be displayed
        if (data.show_popup) {
          setShowModal(true);
        }
      }
    } catch (error) {
      console.error('Error checking app status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check status when token is available
    if (token && status) {
      checkStatus();
    }
  }, [token, status]);

  const closeModal = () => {
    setShowModal(false);
  };

  const refreshStatus = () => {
    checkStatus();
  };

  const verifyConfiguration = async () => {
    await checkStatus();
    // If all configured, close modal
    if (statusData?.all_configured) {
      setShowModal(false);
    }
  };

  return {
    showModal,
    statusData,
    loading,
    closeModal,
    refreshStatus,
    checkStatus,
    verifyConfiguration
  };
};
